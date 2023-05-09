import {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import './main.css';


const category = ['Music', 'Photography', 'Food', 'Travel', 'Lifestyle', 'Personal', 'Health'];

export default function HomePage() {

    const [isActive, setIsActive] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [photos, setPhotos] = useState([]);


    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('https://api.pexels.com/v1/search?query=music&per_page=16', {
                    headers: {
                        Authorization: `${process.env.REACT_APP_PEXEL_AUTHORIZATION_API_KEY}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`This is an HTTP error: The status is ${response.status}`)
                }
                let actualData = await response.json();
                setPhotos(actualData.photos);
                setError(null);
            } catch (err) {
                setPhotos(null);
                setPhotos(null);
            } finally {
                setLoading(false);
            }
        }
        fetchPhotos();
    }, [])

    const header = () => {
        return (<>
            <div className={'card bg-dark text-white'}>
                <img className={'card-img'}
                     src="https://images.pexels.com/photos/8369835/pexels-photo-8369835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                     alt=""/>
                <div className={'position-absolute bottom-50'}>
                    <h2><strong>A beginner's guide to understanding the layers of blockchain
                        technology </strong>
                    </h2>
                </div>
                <div className={'position-absolute bottom-0'}>
                    <img id={'imageProfile'}
                         src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                         className={'rounded-circle mb-1'}/>
                    <h5 className={'mb-1'}><strong>Username1</strong></h5>
                    <p className={'text-muted'}><i className={'bi bi-clock'}/>5min<span
                        className={'badge bg-primary ms-2'}>NEW</span></p>
                </div>
            </div>
        </>)
    }

    const filter = category.map((todo, index) => <li className={'nav-item'} key={index}>
        <button key={index} className={`nav-link ${isActive === index && 'active'}`}
                onClick={() => setIsActive(index)}>{todo}</button>
    </li>)

    const posts = () => {
        const cards = [];
        for (let i = 0; i < photos.length; i += 2) {
            cards.push(<div className={'card-group'} key={i}>
                <div className={'card text-bg-dark'}>
                    <img src={`${photos[i].src.tiny}`} alt={`${photos[i].alt}`}/>
                    <div className={'card-img-overlay'}>
                        <h6 className={'card-title'}>{photos[i].alt}</h6>
                    </div>
                    <div className={'position-absolute bottom-0'}>
                        <img id={'imageProfile'}
                             src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                             className={'rounded-circle'}/>
                        <h6><strong>Username1</strong></h6>
                        <p className={'text-muted m-0 lh-1'}><i className={'bi bi-clock'}/>5min<span
                            className={'badge bg-primary ms-2'}>NEW</span></p>
                    </div>
                </div>
                {i + 1 < photos.length && (<div className={'card text-bg-dark'}>
                    <img src={`${photos[i + 1].src.tiny}`} alt={`${photos[i + 1].alt}`}/>
                    <div className={'card-img-overlay'}>
                        <h6 className={'card-title'}>{photos[i + 1].alt}</h6>
                    </div>
                    <div className={'position-absolute bottom-0'}>
                        <img id={'imageProfile'}
                             src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                             className={'rounded-circle'}/>
                        <h6><strong>Username1</strong></h6>
                        <p className={'text-muted m-0 lh-1'}><i className={'bi bi-clock'}/>5min<span
                            className={'badge bg-primary ms-2'}>NEW</span></p>
                    </div>
                </div>)}
            </div>)
        }
        return cards
    }

    const table = () => {
        return (<>
                <h1 className={'text-center'}>Profiles</h1>
                <div className={'border-dark'}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Nickname</th>
                            <th>Content</th>
                            <th>Achievements</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }

    return (
        <>
            {header()}
            <ul className={'nav nav-pills nav-justified'}>
                {filter}
            </ul>
            <div className={'d-flex flex-row'}>
                <div className={'w-50'}>
                    {loading && <div>A moment please...</div>}
                    {error && (<div>{`There is a problem fetching the post data - ${error}`}</div>)}
                    {posts()}
                </div>
                <div className={'w-50'}>
                    {table()}
                </div>
            </div>
        </>
    )
}