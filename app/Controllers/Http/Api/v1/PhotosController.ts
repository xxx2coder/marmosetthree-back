import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import Photo from "App/Models/Photo"

export default class PhotosController {
  public async index({response}: HttpContextContract) {
    const photos = await Photo.all()

    return response.type('application/json')
      .status(200)
      .json({
        status: 'success',
        photos: photos
      })
  }

  public async store({request, response}: HttpContextContract) {
    await request.validate({
      schema: schema.create({
        photo: schema.file({
          size: '5mb',
          extnames: ['jpg', 'jpeg', 'png', 'webp']
        })
      })
    })

    const requestPhoto = request.file('photo')
    const photoName = new Date().getTime().toString()
    const modelPhoto = await Photo.create({
      collection_name: 'photos',
      name: photoName,
      file_name: `${photoName}.${requestPhoto?.extname}`,
      mime_type: requestPhoto?.type
    })

    await requestPhoto?.move(Application.publicPath('photos'), {
      name: modelPhoto.file_name
    })

    return response.type('application/json')
      .status(200)
      .json({
        status: 'success',
        photo: modelPhoto
      })
  }

  public async destroy({request, response}: HttpContextContract) {
    const photo = await Photo.find(request.params().id)

    if (!photo) {
      return response.type('application/json').status(404).json({
        status: 'error',
        message: 'Фотография не найдена.'
      })
    }

    await photo.delete()

    return response.type('application/json').status(200).json({
      status: 'success',
      message: 'Фотография успешно удалена.'
    })
  }
}
