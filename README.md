# Video Downloader Extension

Este é um projeto de extensão do navegador que permite baixar vídeos do YouTube em diferentes resoluções.

## Funcionalidades

- **Baixar Vídeos em Diferentes Resoluções**: A extensão permite baixar vídeos do YouTube em várias resoluções, incluindo 4K, 1440p, 1080p, 720p, 480p, 360p e 240p.
- **Menu de Contexto**: A extensão adiciona um menu de contexto ao navegador, permitindo que o usuário clique com o botão direito do mouse na página do YouTube e selecione a opção "Baixar video na resolução..." para iniciar o processo de download.
- **Comunicação com Servidor Flask**: A extensão se comunica com um servidor Flask local para iniciar o processo de download do vídeo selecionado.

## Como Usar

1. **Instalação**: Clone este repositório ou baixe o código-fonte da extensão.
2. **Instalação da Extensão**: Abra o navegador Chrome e vá para a página de extensões. Ative o modo de desenvolvedor e carregue a extensão a partir do diretório do código-fonte.
3. **Uso**: Navegue até um vídeo do YouTube, clique com o botão direito do mouse na página e selecione a opção "Baixar video na resolução...". Escolha a resolução desejada e o vídeo será baixado automaticamente.

## Pré-requisitos

- **Python**: Certifique-se de ter o Python instalado no seu sistema.
- **FFmpeg**: O projeto requer o FFmpeg para mesclar os formatos de vídeo e áudio. Certifique-se de ter o FFmpeg instalado e configurado corretamente.
- **Flask e Flask CORS**: Para usar a extensão e necessario instalar o Flask e o CORS:
```
pip install Flask
```

```
pip install Flask-Cors
```


## Configuração do Servidor Flask

Certifique-se de configurar corretamente o servidor Flask local antes de usar a extensão. O código-fonte do servidor Flask pode ser encontrado no diretório `server`.

## Mudando o Local de Download

Para mudar o local onde os vídeos são baixados, navegue até o arquivo app.py e altere a linha abaixo para o diretório desejado:

```python
'outtmpl': 'downloads/%(title)s.%(ext)s'
```





# Video Downloader Extension

This is a browser extension project that allows downloading YouTube videos in different resolutions.

## Features

- **Download Videos in Different Resolutions**: The extension allows downloading YouTube videos in various resolutions, including 4K, 1440p, 1080p, 720p, 480p, 360p, and 240p.
- **Context Menu**: The extension adds a context menu to the browser, allowing the user to right-click on the YouTube page and select the option "*Baixar video na resolução...*" to initiate the download process.
- **Flask Server Communication**: The extension communicates with a local Flask server to initiate the download process for the selected video.

## How to Use

1. **Installation**: Clone this repository or download the extension source code.
2. **Extension Installation**: Open the Chrome browser and go to the extensions page. Enable developer mode and load the extension from the source code directory.
3. **Usage**: Navigate to a YouTube video, right-click on the page, and select the option "*Baixar video na resolução...*" to download. Choose the desired resolution, and the video will be downloaded automatically.

## Prerequisites

- **Python**: Make sure Python is installed on your system.
- **FFmpeg**: The project requires FFmpeg to merge video and audio formats. Ensure FFmpeg is installed and properly configured.
- **Flask and Flask CORS**: To use the extension, it is necessary to install Flask and CORS:
```
pip install Flask
```

```
pip install Flask-Cors
```

## Flask Server Setup

Make sure to properly configure the local Flask server before using the extension. The Flask server source code can be found in the `server` directory.

## Changing the Download Location

To change the location where the videos are downloaded, navigate to the app.py file and modify the line below to the desired directory:

```python
'outtmpl': 'downloads/%(title)s.%(ext)s'
```

## License

This project is licensed under the [Unlicense](LICENSE).

## References

This project uses [yt-dlp](https://github.com/yt-dlp/yt-dlp) to download videos.