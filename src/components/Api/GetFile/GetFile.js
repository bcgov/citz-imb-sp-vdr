import { RestCall } from '../RestCall/RestCall'

export const GetFile = async (serverRelativeUrl) => {
    const endPoint = `/_api/web/GetFileByServerRelativeURl('${serverRelativeUrl}')/$value`

    try {
        const response = await RestCall({ endPoint, returnBlob: true })
        return response
    } catch (error) {
        console.error('GetFile error :>> ', {
            serverRelativeUrl
        })
    }
}
