import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Navbar from "../../components/global/Navbar";
import PostCard from "../../components/post/PostCard";
import Footer from "../../components/global/Footer";
import { getPosts } from "../../redux/posts/postActions";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "../../components/global/Loader";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import FilterIcon from "@mui/icons-material/FilterAltOutlined";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { BACKEND_URL } from "../../redux/auth/authActions";
// import "../../styles/Listings.scss";
import "../../styles/Categories.scss";

function Home() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await getPosts();
      console.log(data);

      setPosts(data.posts);
      setAllPosts(data.posts);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showPosts = async () => {
    try {
      const { data } = await getPosts();
      console.log(data);
      setPosts(data.posts);
      setAllPosts(data.posts);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/categories`).then(({ data }) => {
      setCategories(data.categories);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    getAllPosts();
  }, []);

  // const handleSearch = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   if (query) {
  //     const results = allPosts.filter(
  //       (post) =>
  //         post.category.toLowerCase().includes(query) ||
  //         post.surname.toLowerCase().includes(query)
  //     );
  //     setPosts(results);
  //   } else {
  //     setPosts(allPosts);
  //   }
  // };

  const handleQuickSearch = (id) => {
    setSelectedCategory(id);

    if (id) {
      const results = allPosts.filter((post) => post.category === id);
      setPosts(results);
    } else {
      setPosts(allPosts);
    }
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />

        <Container sx={{ pt: 2, pb: 5, minHeight: "83vh" }}>
          <Box sx={{ maxWidth: "100%", flexGrow: 1, marginBottom: 4 }}>
            <Carousel
              autoPlay={true}
              navButtonsAlwaysVisible={isSmallScreen}
              interval={3000}
              animation="slide"
              next={() => <Button>{<KeyboardArrowRight />}</Button>}
              prev={() => <Button>{<KeyboardArrowLeft />}</Button>}
            >
              {images.map((item, index) => (
                <Paper key={index} sx={{ padding: 2, textAlign: "center" }}>
                  <Box
                    component="img"
                    src={item.imgPath}
                    alt={item.label}
                    sx={{
                      width: "100%",
                      height: { xs: 350, md: 500 },
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ marginTop: 2 }}>
                    <h3>{item.label}</h3>
                  </Box>
                </Paper>
              ))}
            </Carousel>
          </Box>

          <Box>
            <div className="categories">
              <h1>Welcome to ArtiKon</h1>
              <p>
                Discover the beauty of handcrafted artistry. At ArtiKon, we
                bring you unique, one-of-a-kind creations made with passion and
                skill by local artisans. From timeless jewelry and home décor to
                personalized gifts and accessories, each piece tells a story of
                tradition, craftsmanship, and creativity. Explore our
                collections and support the artists behind the craft.
              </p>
              <h2>Explore Some Top Categories</h2>
              <div className="category-list">
                <div
                  className={`category ${
                    selectedCategory === "all" && "selected"
                  }`}
                  onClick={() => {
                    setSelectedCategory("all");
                    setPosts(allPosts);
                  }}
                >
                  <div className="category_icon">{<FilterIcon />}</div>
                  <p>{"All"}</p>
                </div>
                {categories.map((category, index) => (
                  <div
                    className={`category ${
                      category._id === selectedCategory ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleQuickSearch(category._id)}
                  >
                    <div className="category_icon">{<FilterIcon />}</div>
                    <p>{category.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </Box>
          {posts.length !== 0 ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {loading ? (
                  <Loader />
                ) : (
                  posts.map((post, index) => (
                    <Grid item xs={12} sm={4} md={4} key={index}>
                      <PostCard
                        id={post._id}
                        title={post.title}
                        description={post.description ? post.description : ""}
                        image={post.coverPhoto ? post.coverPhoto.url : ""}
                        profilePhoto={
                          post.postedBy.photo ? post.postedBy.photo.url : ""
                        }
                        subheader={moment(post.createdAt).format(
                          "MMMM DD, YYYY"
                        )}
                        comments={post.comments.length}
                        likes={post.likes.length}
                        likesId={post.likes}
                        showPosts={showPosts}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: "#f57eb6",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
                borderRadius: "20% 20%",
              }}
            >
              <h2>No Post Is Available Now...</h2>
              <h4>Make A Post</h4>
            </Box>
          )}
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default Home;

const images = [
  {
    label: "ArtiKon carousel image 1",
    imgPath: "/carousel-img/p1.jpg",
  },
  {
    label: "ArtiKon carousel image 2",
    imgPath: "/carousel-img/p2.jpg",
  },
  {
    label: "ArtiKon carousel image 3",
    imgPath: "/carousel-img/p3.jpg",
  },
  {
    label: "ArtiKon carousel image 4",
    imgPath: "/carousel-img/p4.jpg",
  },
  {
    label: "ArtiKon carousel image 5",
    imgPath: "/carousel-img/p5.jpg",
  },
  {
    label: "ArtiKon carousel image 6",
    imgPath: "/carousel-img/p6.jpg",
  },
  {
    label: "ArtiKon carousel image 7",
    imgPath: "/carousel-img/p7.jpg",
  },
  {
    label: "ArtiKon carousel image 8",
    imgPath: "/carousel-img/p8.jpg",
  },
  {
    label: "ArtiKon carousel image 9",
    imgPath: "/carousel-img/p9.jpg",
  },
  {
    label: "ArtiKon carousel image 10",
    imgPath: "/carousel-img/p10.jpg",
  },
];
