import React, { useEffect, useState } from 'react'
import api from '../../services/api';

interface ModalProps {
  title: string,
  _id: string,
  description: string
  image: string,
  closeModal: () => void,
  saveModal: (_id: string, title: string, image: string) => void
}

export const ModalComponent = (props: ModalProps) => {
  const [_id, set_id] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [LinkImg, setLinkImg] = useState<string>('')

  useEffect(() => {
    if(props._id) {
      set_id(props._id)
    }

    if(props.description) {
      setDescription(props.description)
    }

    if(props.image) {
      setLinkImg(props.image)
    }

  }, [props])

  function loadImage(event:any) {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);

    // Envia a imagem para o backend e coleta o retorno
    api.post(`/postLoadFile`, formData).then((res) => {
      let urlImg = `${res.data.filename}`
      setLinkImg(urlImg)
    })
  }

  return (
    <div className="modal">
      <div className="modalItem">

        <div className="modalTitle">
          <h1>{props.title}</h1>
          <button onClick={() => props.closeModal()}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <hr />

        <div className="form">
          <div className="groupInput">
            <div className="groupInputSelet">
              <label htmlFor="">Descrição</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>

          <div className="groupInput">
            <div className="groupInputSelet">
              <label className="customFileUpload">
              <input type="file" name="image" onChange={loadImage}  />
              Adicionar Imagem
              </label>
            </div>
          </div>

          <div className="instructionImage">
            { LinkImg ? (<img src={`${LinkImg}`} alt="" /> ) : null }
          </div>

          <div className="modalActions">
            <button onClick={() => props.closeModal()}>Cancelar</button>
            <button onClick={() => props.saveModal(_id, description, LinkImg)}>Adicionar</button>
          </div>

        </div>

      </div>
    </div>

  )
}
