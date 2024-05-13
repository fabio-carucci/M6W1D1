import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Spinner, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAuth } from "../../context/AuthContextProvider";
import { PencilSquare } from 'react-bootstrap-icons';
import "./styles.css";
import BlogItem from '../../components/blog/blog-item/BlogItem';
import placeholderImage from '../../assets/placeholder.jpg';

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, setUser, token } = useAuth();
    const { _id: id, nome, cognome, email, avatar } = user;

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://m6w1d1-inzr.onrender.com/blogPosts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Errore durante il recupero dei post del blog");
            }
            const data = await response.json();

            // Filtra i post per l'autore corrente
            const filteredPosts = data.filter(post => post.author._id === id);
            setPosts(filteredPosts);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleImageUpdate = async (newImage) => {
        try {
            const formData = new FormData();
            formData.append('avatar', newImage);

            const response = await fetch(`https://m6w1d1-inzr.onrender.com/authors/${id}/avatar`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Errore durante l'aggiornamento dell'immagine del profilo");
            }

            const userData = await response.json();
            setUser(userData);

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container className='profile-container'>
            <Row>
                <Col xs={12} md={6} className='text-center'>
                <OverlayTrigger placement="top" overlay={<Tooltip>Modifica immagine</Tooltip>} >
                        <div className="avatar-wrapper">
                            <Image
                                src={avatar || placeholderImage}
                                alt="Avatar"
                                roundedCircle
                                className="avatar-image"
                            />
                            <div className="edit-icon">
                                <label htmlFor="avatar-upload">
                                    <PencilSquare />
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpdate(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </div>
                        </div>
                    </OverlayTrigger>
                    <h2>{nome} {cognome}</h2>
                    <p>{email}</p>
                </Col>
                <Col xs={12} md={6}>
                    {loading ? (
                        <Spinner animation="border" role="status"></Spinner>
                    ) : (
                        <div>
                            <h2 className='text-center mb-4'>I miei post</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {posts.length === 0 ? (
                                <p className="text-center">Non è stato scritto ancora nessun post.</p>
                            ) : (
                                posts.map((post, i) => (
                                    <div style={{marginBottom: "20px"}} key={post.title}>
                                        <BlogItem {...post} />
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
