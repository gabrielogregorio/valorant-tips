import React, { useEffect, useState } from 'react';
import * as uuid from 'uuid';
import Router, { useRouter } from 'next/router';
import NavbarComponent from '@/layout/navbar';
import api from '@/services/api';
import { agents, maps, difficult, moment, side } from '@/data/data-valorant';
import Input from '@/base/input';
import ModalComponent from '@/widgets/modal';
import formatImage from '@/services/formatEnvironment';
import FooterComponent from '@/layout/footer';
import Selected from '@/base/selected';
import BreadcrumbComponent from '@/widgets/breadcrumb';
import Title from '@/base/title';
import Button from '@/base/button';
import { agentInterface, mapInterface } from '@/interfaces/posts';
import { FaTimes } from 'react-icons/fa';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs';
import navbarEnum from '@/interfaces/navbar';
import LoaderComponent from '@/base/loader';
import GroupInput from '@/base/groupInput';
import { modelNavbarAdmin } from '../../core/schemas/navbar';
import SubContainer from '../base/subContainer';
import FormComponent from '../base/Form';

type actionType = 'top' | 'bottom';

interface imgInterface {
  description: string;
  image: string;
  id: string;
}

interface propsModalInterface {
  id: string;
  description: string;
  image: string;
}

type modeManagment = {
  breadcrumbs: any[];
  mode: 'create' | 'edit';
};

export default function CreatePostManagement({ breadcrumbs, mode }: modeManagment) {
  const { query } = useRouter();
  const id = `${query?.id || ''}`;

  const [redirect, setRedirect] = useState<boolean>(false);
  const [imgAdded, setImgAdded] = useState<imgInterface[]>([]);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formTagMoment, setFormTagMoment] = useState<string>('');
  const [formTagDifficult, setFormTagDifficult] = useState<string>('');
  const [formTagAbility, setFormTagAbility] = useState<string>('');
  const [formTagSide, setFormTagSide] = useState<string>('');
  const [formTagMap, setFormTagMap] = useState<string>('');
  const [formTagMapPosition, setFormTagMapPosition] = useState<string>('');
  const [formTagAgent, setFormTagAgent] = useState<string>('');
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [propsModal, setPropsModal] = useState<propsModalInterface>({
    id: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (mode === 'edit') {
      setLoading(true);
      api
        .get(`/post/${id}`)
        .then((res) => {
          const postJson = res.data;
          setFormTitle(postJson.title);
          setFormDescription(postJson.description);
          setFormTagMoment(postJson.tags.moment);
          setFormTagDifficult(postJson.tags.difficult);
          setFormTagAbility(postJson.tags.ability);
          setFormTagSide(postJson.tags.side);
          setFormTagMap(postJson.tags.map);
          setFormTagMapPosition(postJson.tags.mapPosition);
          setFormTagAgent(postJson.tags.agent);
          setImgAdded(postJson.imgs);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, mode]);

  async function handleSubmit() {
    setLoading(true);
    const request = {
      title: formTitle,
      description: formDescription,
      user: '',
      tags: {
        moment: formTagMoment,
        difficult: formTagDifficult,
        ability: formTagAbility,
        side: formTagSide,
        map: formTagMap,
        mapPosition: formTagMapPosition,
        agent: formTagAgent,
      },
      imgs: imgAdded,
    };

    if (mode === 'create') {
      api
        .post(`/post`, { ...request })
        .then(() => {
          setRedirect(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (mode === 'edit') {
      api
        .put(`/post/${id}`, { ...request })
        .then(() => {
          setRedirect(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function deleteStep(idPost: string) {
    setImgAdded(imgAdded.filter((item) => item.id !== idPost));
  }

  function putPosition(idPost: string, action: actionType) {
    const positionPut = imgAdded.findIndex((item) => item.id === idPost);
    const copyListDelete = imgAdded[positionPut];
    const copyImgAdded = JSON.parse(JSON.stringify(imgAdded));

    let increment = 0;

    if (action === 'bottom' && positionPut > 0) {
      increment = -1;
    } else if (action === 'top' && positionPut < imgAdded.length) {
      increment = 1;
    }

    copyImgAdded.splice(positionPut, 1);
    copyImgAdded.splice(positionPut + increment, 0, copyListDelete);
    setImgAdded(copyImgAdded);
  }

  function renderAgent() {
    return agents();
  }

  function renderSide() {
    return side();
  }

  function renderMaps() {
    return maps();
  }

  function renderDifficult() {
    return difficult();
  }

  function renderMoment() {
    return moment();
  }

  function renderHabilits() {
    const filterAbilities: agentInterface = agents().filter(
      (agent) => agent.name === formTagAgent,
    )?.[0];
    return filterAbilities?.habilits ?? [];
  }

  function renderPositionsMap() {
    const filterMapPositions: mapInterface = maps().filter((map) => map.name === formTagMap)?.[0];
    return filterMapPositions?.mapPosition ?? [];
  }

  function showModalWithItem(idPost: string) {
    const item = imgAdded.filter((itemLocal) => itemLocal.id === idPost)[0];
    setPropsModal(item);
    setVisibleModal(true);
  }

  function showModal() {
    setPropsModal({ id: '', description: '', image: '' });
    setVisibleModal(true);
  }

  function closeModal() {
    setPropsModal({ id: '', description: '', image: '' });
    setVisibleModal(false);
  }

  function renderSteps() {
    return imgAdded.map((instruction, key) => (
      <div key={instruction.id}>
        <div className="instructionTop">
          <p onClick={() => showModalWithItem(instruction.id)} role="presentation">
            {key + 1} - {instruction.description}
          </p>
          <Button
            onClick={() => deleteStep(instruction.id)}
            dataTestid={`deleteStepButton-${key + 1}`}>
            <FaTimes />
          </Button>
        </div>

        <div className="instructionImage">
          <img src={formatImage(instruction.image)} alt={instruction.description} />

          <br />
          <Button
            className="btn-bottom"
            onClick={() => putPosition(instruction.id, 'bottom')}
            dataTestid={`btn-top-${key + 1}`}>
            <BsChevronUp />
          </Button>
          <Button
            className="btn-top"
            onClick={() => putPosition(instruction.id, 'top')}
            dataTestid={`btn-bottom-${key + 1}`}>
            <BsChevronDown />
          </Button>
        </div>
        <hr />
      </div>
    ));
  }

  function saveModal(idPost: string, description: string, image: string) {
    if (idPost) {
      const copyImgAdded: imgInterface[] = JSON.parse(JSON.stringify(imgAdded));
      for (let x = 0; x < copyImgAdded.length; x += 1) {
        if (copyImgAdded[x].id === idPost) {
          copyImgAdded[x].description = description;
          copyImgAdded[x].image = image;
        }
      }
      setImgAdded(copyImgAdded);
      setVisibleModal(false);
    } else {
      setImgAdded([...imgAdded, { description, image, id: uuid.v4().toString() }]);
      setVisibleModal(false);
    }
  }

  async function deletePost(idPost: string) {
    setLoading(true);
    api.delete(`/post/${idPost}`).finally(() => {
      setLoading(false);
      setRedirect(true);
    });
  }

  useEffect(() => {
    if (redirect) {
      Router.push('/admin/view-posts');
    }
  }, [redirect]);

  return (
    <>
      {mode === 'create' ? (
        <NavbarComponent selected={navbarEnum.PostCreate} modelNavbar={modelNavbarAdmin} />
      ) : (
        <NavbarComponent selected={navbarEnum.EditScreen} modelNavbar={modelNavbarAdmin} />
      )}
      <BreadcrumbComponent admin breadcrumbs={breadcrumbs} />
      <LoaderComponent active={loading} />

      <SubContainer>
        {visibleModal ? (
          <ModalComponent
            title="Adicionar Post"
            id={propsModal.id}
            description={propsModal.description}
            image={propsModal.image}
            closeModal={() => closeModal()}
            // eslint-disable-next-line react/jsx-no-bind
            saveModal={saveModal}
          />
        ) : null}

        <FormComponent>
          <Title>{mode === 'create' ? 'Criar um post' : 'Editar um post'}</Title>

          {mode === 'edit' ? (
            <Button className="btn-color-primary" onClick={() => deletePost(id)}>
              Excluir
            </Button>
          ) : null}

          <Input name="title" type="text" text="Titulo" value={formTitle} setValue={setFormTitle} />
          <Input
            name="description"
            type="text"
            text="Descrição"
            value={formDescription}
            setValue={setFormDescription}
          />

          <hr />

          <GroupInput>
            <Selected
              name="Agente"
              text="Agente"
              value={formTagAgent}
              setValue={setFormTagAgent}
              render={renderAgent()}
            />
            <Selected
              name="Mapa"
              text="Mapa"
              value={formTagMap}
              setValue={setFormTagMap}
              render={renderMaps()}
            />
            <Selected
              name="Habilidade"
              text="Habilidade"
              value={formTagAbility}
              setValue={setFormTagAbility}
              render={renderHabilits()}
            />
          </GroupInput>

          <GroupInput>
            <Selected
              name="Posição"
              text="Posição"
              value={formTagMapPosition}
              setValue={setFormTagMapPosition}
              render={renderPositionsMap()}
            />
            <Selected
              name="Momento"
              text="Momento"
              value={formTagMoment}
              setValue={setFormTagMoment}
              render={renderMoment()}
            />
            <Selected
              name="Dificuldade"
              text="Dificuldade"
              value={formTagDifficult}
              setValue={setFormTagDifficult}
              render={renderDifficult()}
            />
          </GroupInput>

          <GroupInput>
            <Selected
              name="Lado"
              text="Lado"
              value={formTagSide}
              setValue={setFormTagSide}
              render={renderSide()}
            />
          </GroupInput>

          <hr />
          <p className="info">
            Passo a passo da dica. Lembre-se de usar Zoom, usar marcações claras, de forma que seja
            bem visível.
            <br />
            <br /> Clique nos titulos para EDITAR os itens
          </p>
          <hr />
          <div className="stepsPost">{renderSteps()}</div>

          <GroupInput>
            <div className="groupInputSelect">
              <Button className="btn-outline-secondary" onClick={() => showModal()}>
                Novo Passo
              </Button>
              <br />
            </div>
          </GroupInput>
          <GroupInput>
            <div className="groupInputSelect">
              <Button onClick={() => handleSubmit()} className="btn-secondary">
                Publicar Dica
              </Button>
            </div>
          </GroupInput>
        </FormComponent>
      </SubContainer>
      <FooterComponent />
    </>
  );
}
