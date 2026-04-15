// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer} from 'electron';
import { BlogPost } from './types/BlogPost';
import { IcpCommunicationMessages } from './types/IcpCommunication/IcpCommunicationMessages';
import { BlogPostUploadStateCallbackType } from './types/IcpCommunication/IcpCommunicationCallbackTypes';

contextBridge.exposeInMainWorld('api', {
    postBlog: (postData: BlogPost) => ipcRenderer.invoke("post-blog", postData),

    onBlogPostUploadStarted: (callback: BlogPostUploadStateCallbackType) =>
    {
        const listener = (event: Electron.IpcRendererEvent, title: string) => 
        {
            callback(title);
        };

        ipcRenderer.on(IcpCommunicationMessages.StartBlogPostUpload, listener);

        return () => {
            ipcRenderer.removeListener(IcpCommunicationMessages.StartBlogPostUpload, listener);
        };
    },

    onBlogPostUploadFinished: (callback: BlogPostUploadStateCallbackType) =>
    {
        const listener = (event: Electron.IpcRendererEvent, title: string) =>
        {
            callback(title);
        };

        ipcRenderer.on(IcpCommunicationMessages.FinishBlogPostUpload, listener);

        return () => {
            ipcRenderer.removeListener(IcpCommunicationMessages.FinishBlogPostUpload, listener);
        };
    },

    onBlogPostUploadFailed: (callback: BlogPostUploadStateCallbackType) =>
    {
        const listener = (event: Electron.IpcRendererEvent, title: string) =>
        {
            callback(title);
        };

        ipcRenderer.on(IcpCommunicationMessages.FailBlogPostUpload, listener);

        return () => {
            ipcRenderer.removeListener(IcpCommunicationMessages.FailBlogPostUpload, listener);
        };
    }
});
