import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../component/Loading";
import axios from "axios";

export default function Category({modification, setModification, deleteProject, setDeleteProject, setIsAdd, isAdd}){
    const [categories, setCategories] = React.useState([])
    const [isLoad, setIsLoad] = React.useState(true)


    React.useEffect( () => {

        async function fetchData(){
            await axios.get('https://marine-api.onrender.com/all-categories')
                .then(res => res.data)
                .then(data => {
                    setCategories(data)
                    setIsLoad(false)
                })
                .catch(err => {
                    console.error(err)
                })
        }

        fetchData()


    }, [modification, deleteProject, isAdd])

    return(
        <>
            {
                isLoad ?
                    <Loading/>
                    :
                    null
            }
            <ul className='categorie-container'>
                {
                    categories.map(categorie =>
                        <li key={categorie._id} className='categorie'>
                            <div className='categorie-information'>
                                <p style={{display: 'flex', alignItems: 'center'}}><span style={{fontSize: '10px', color: '#1E1E1E', marginRight: '5px'}}>●</span>{categorie.name}</p>
                                <div className="action">
                                    <FontAwesomeIcon className={'modify'} icon={faPenToSquare}
                                                     onClick={() => setModification(({
                                                         ...categorie,
                                                         type: 'categorie'
                                                     }))}/>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => setDeleteProject(({
                                        ...categorie,
                                        type: 'categorie'
                                    }))}/>
                                </div>
                            </div>

                            <ul className='projet-container'>
                                {
                                    categorie.content.map(projet =>
                                        <article className='project'>
                                            <span>{projet.name}</span>

                                            <div className="action">
                                                <FontAwesomeIcon className={'modify'} icon={faPenToSquare}
                                                                 onClick={() => setModification(({
                                                                     ...projet,
                                                                     type: 'projet'
                                                                 }))}/>
                                                <FontAwesomeIcon icon={faTrash} onClick={() => setDeleteProject(({
                                                    ...projet,
                                                    type: 'projet'
                                                }))}/>
                                            </div>
                                        </article>
                                    )
                                }
                                <article className='project' onClick={() => setIsAdd({show: true, type: 'projet', category: categorie.name})}>
                                    <span style={{cursor: "pointer"}}>Nouveau projet</span>
                                </article>
                            </ul>
                        </li>
                    )
                }

                <li>
                    <div className='categorie-information' onClick={() => setIsAdd({show: true, type: 'categorie'})}>
                        <p style={{display: 'flex', alignItems: 'center', cursor: "pointer"}}>
                            <span style={{fontSize: '10px', color: '#1E1E1E', marginRight: '5px'}}>-></span>
                            Nouvelle catégorie
                        </p>
                    </div>
                </li>
            </ul>
        </>
    )
}