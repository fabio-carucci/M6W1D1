import React, { useEffect, useState } from "react";
import { Container, Image, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import { useAuth } from "../../context/AuthContextProvider";
const Blog = props => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const getPostById = async () => {
    try {
      if (!id) return; // Evita di fare la richiesta se l'ID non è disponibile
      const response = await fetch(`http://localhost:5001/blogPosts/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Errore durante il recupero del post");
      }
      const data = await response.json();
      setBlog(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      navigate("/404");
    }
  };

  useEffect(() => {
    getPostById();
  }, [id, navigate]);

  return (
    <div className="blog-details-root">
      <Container>
        {loading ? (
          <Spinner className="mt-2" animation="border" role="status">
          </Spinner>
        ) : (
          <>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor author={blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{(new Date(blog.createdAt)).toLocaleString('it-IT', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                  })}
                </div>
                <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  {/* <BlogLike defaultLikes={["123"]} onChange={console.log} /> */}
                </div>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
          </>
        )}
      </Container>
    </div>
  );
};
export default Blog;