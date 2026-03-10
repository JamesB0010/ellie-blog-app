// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer} from 'electron';
import { BlogPost } from './Types/BlogPost';

contextBridge.exposeInMainWorld('api', {
    postBlog: (postData: BlogPost) => ipcRenderer.invoke("post-blog", postData),

    onBlogPostUploadStarted: (callback: (title: string) => void) => {
    const listener = (event: Electron.IpcRendererEvent, title: string) => callback(title);

    ipcRenderer.on("start-blog-post-upload", listener);

    return () => {
        ipcRenderer.removeListener("start-blog-post-upload", listener);
    };
},

    onBlogPostUploadFinished: (callback: (title: string) => void) => {
        const listener = (event: Electron.IpcRendererEvent, title: string) => callback(title);

        ipcRenderer.on("finish-blog-post-upload", listener);

        return () => {
            ipcRenderer.removeListener("finish-blog-post-upload", listener);
        };
    },

    onBlogPostUploadFailed: (callback: (title: string) => void) => {
        const listener = (event: Electron.IpcRendererEvent, title: string) => callback(title);

        ipcRenderer.on("fail-blog-post-upload", listener);

        return () => {
            ipcRenderer.removeListener("fail-blog-post-upload", listener);
        };
    }
});
