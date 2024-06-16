import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)

progress_percent = '0'
content_length = 0
server_state = 'idle'

def get_progress(d):
    global progress_percent, server_state, video_title   
    if d['status'] == 'finished':
        file_tuple = os.path.split(os.path.abspath(d['filename']))
        print("Done downloading {}".format(file_tuple[1]))
        server_state = 'idle'
    elif d['status'] == 'downloading':
        p = d['_percent_str']
        p = p.replace('%','')
        progress_percent = str(p)
        video_title = d['info_dict']['title']
        print(d['filename'], d['_percent_str'], d['_eta_str'])
        server_state = 'downloading'
        
@app.route('/status', methods=['GET'])
def server_status():
    global server_state
    status = {'status': server_state}
    return jsonify(status)

@app.route('/progress', methods=['GET'])
def progress():
    global progress_percent, video_title
    if (progress_percent != '0.0'):
        return jsonify({'percent': progress_percent, 'title': video_title})
    else:
        return jsonify({'percent': '0', 'title': '[N/A]'})
    
@app.route('/download', methods=['POST'])
def download_video():
    global server_state
    data = request.json
    url = data.get('url')
    resolution = data.get('resolution')
    if url and resolution:
        resolution_map = {
            '2160p': 'bestvideo[height>=2160]+bestaudio/best[height>=2160]',
            '1440p': 'bestvideo[height<=1440]+bestaudio/best[height<=1440]',
            '1080p': 'bestvideo[height<=1080]+bestaudio/best[height<=1080]',
            '720p': 'bestvideo[height<=720]+bestaudio/best[height<=720]',
            '480p': 'bestvideo[height<=480]+bestaudio/best[height<=480]',
            '360p': 'bestvideo[height<=360]+bestaudio/best[height<=360]',
            '240p': 'bestvideo[height<=240]+bestaudio/best[height<=240]',
            '144p': 'bestvideo[height<=144]+bestaudio/best[height<=144]'
        }
        ydl_opts = {
            'format': resolution_map.get(resolution, 'best'),
            # 'outtmpl': 'D:\\JP - User\\Videos\\Video Downloads\\%(title)s.%(ext)s',
            'outtmpl': 'downloads/%(title)s.%(ext)s',
            'merge_output_format': 'mp4',
            'progress_hooks': [get_progress],
            'ffmpeg_location': 'C:\\ffmpeg\\bin'
        }
        try:
            server_state = 'downloading'
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
            return jsonify({'status': 'success', 'url': url, 'resolution': resolution})
        except Exception as e:
            server_state = 'idle'
            return jsonify({'status': 'error', 'message': str(e)}), 500
    else:
        return jsonify({'status': 'error', 'message': 'No URL or resolution provided'}), 400

if __name__ == '__main__':
    app.run(port=5000)
