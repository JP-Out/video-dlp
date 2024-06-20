# Projeto de Download de Vídeos

## O que o projeto faz

Este projeto fornece uma aplicação web para download de vídeos de diferentes resoluções diretamente do YouTube. A interface de usuário permite monitorar o progresso do download em tempo real.

## Por que o projeto é útil

Este projeto é útil para usuários que desejam baixar vídeos do YouTube em várias resoluções de maneira fácil e rápida. Ele oferece uma interface gráfica para monitorar o progresso do download, além de uma extensão de navegador que facilita o envio de links de vídeo diretamente para a aplicação.

## Como os usuários podem começar a usar o projeto

Para começar a usar o projeto, siga os passos abaixo:

1. Clone este repositório para o seu ambiente local.
2. Instale as dependências necessárias.
3. Execute o servidor Python (`app.py`).
4. Abra a interface de usuário (`popup.html`) em um navegador para monitorar o progresso do download.
5. Utilize a extensão do navegador para enviar links de vídeo para o servidor.

## Como instalar dependências do projeto

### Python

1. Certifique-se de ter o Python 3.x instalado.
2. Instale as seguintes dependências:
    ```sh
    pip install flask flask-cors yt-dlp
    ```
3. Certifique-se de ter o [yt-dlp](https://github.com/yt-dlp/yt-dlp) e o [ffmpeg](https://ffmpeg.org/) instalados e configurados no PATH.

### Extensão do Navegador

1. Abra o Google Chrome e vá para `chrome://extensions/`.
2. Ative o "Modo do desenvolvedor" no canto superior direito.
3. Clique em "Carregar sem compactação" e selecione a pasta `extension` dentro do projeto.

## Referenciando ferramentas de projetos de outras pessoas

Este projeto utiliza as seguintes ferramentas de terceiros:

- [yt-dlp](https://github.com/yt-dlp/yt-dlp): Um fork do youtube-dl com melhorias.
- [ffmpeg](https://ffmpeg.org/): Um framework completo para gravar, converter e fazer streaming de áudio e vídeo.
- [Flask](https://flask.palletsprojects.com/): Um micro framework web para Python.
- [Flask-CORS](https://flask-cors.readthedocs.io/): Uma extensão para Flask para lidar com Cross-Origin Resource Sharing (CORS).

---

# Video Download Project

## What the project does

This project provides a web application for downloading videos in various resolutions directly from YouTube. The user interface allows real-time monitoring of the download progress.

## Why the project is useful

This project is useful for users who want to download YouTube videos in various resolutions easily and quickly. It offers a graphical interface to monitor download progress, and a browser extension to facilitate sending video links directly to the application.

## How users can get started with the project

To get started with the project, follow these steps:

1. Clone this repository to your local environment.
2. Install the necessary dependencies.
3. Run the Python server (`app.py`).
4. Open the user interface (`popup.html`) in a browser to monitor download progress.
5. Use the browser extension to send video links to the server.

## How to install project dependencies

### Python

1. Ensure you have Python 3.x installed.
2. Install the dependencies listed in `requirements.txt`:
    ```sh
    pip install -r requirements.txt
    ```
3. Ensure you have [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [ffmpeg](https://ffmpeg.org/) installed and configured in your PATH.

### Browser Extension

1. Open Google Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" in the top right corner.
3. Click on "Load unpacked" and select the `extension` folder within the project.

## Referencing tools from other projects

This project uses the following third-party tools:

- [yt-dlp](https://github.com/yt-dlp/yt-dlp): A fork of youtube-dl with enhancements.
- [ffmpeg](https://ffmpeg.org/): A complete framework for recording, converting, and streaming audio and video.
- [Flask](https://flask.palletsprojects.com/): A micro web framework for Python.
- [Flask-CORS](https://flask-cors.readthedocs.io/): An extension for Flask to handle Cross-Origin Resource Sharing (CORS).
