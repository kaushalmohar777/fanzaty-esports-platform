const url = `https://api.cloudinary.com/v1_1/dorbokwzm/auto/upload`

const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'fanzaty-esport-preset');

    const response = await fetch(url, {
        method: 'post',
        body: formData
    })
    const responseData = await response.json()


    return responseData
}

export default uploadFile