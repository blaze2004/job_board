import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import categories from "../data/categories";
import CategoryCard from "../components/JobCatCard";
import { Container } from "react-bootstrap";

export const Home = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="homePage">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <div className="heroSection">
          <Row style={{ width: "100%" }}>
            <Col md={6}>
              <div className="headingContainer">
                <div style={{ width: "100%" }}>
                  <div className="heading">Explore Opportunities</div>
                  <div className="subheading">
                    Browse thousands of jobs in various fields.
                  </div>
                  <div className="callAction">
                    <Button>Start your job search now</Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="front-image">
                <img src="/images/userSearch.png" />
              </div>
            </Col>
          </Row>
        </div>

        <div className="featuredJobsCatg">
          <div>
            <div className="headingContainer">
              <div
                className="heading"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                Featured Jobs Categories
              </div>
            </div>

            <div className="jobCatCardsContainer">
              <Container className="my-4">
                <Row className="g-4">
                  {categories.map((category, index) => (
                    <Col key={index} md={3} sm={6} xs={12}>
                      <CategoryCard
                        title={category.title}
                        icon={category.icon}
                        color={category.color}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};
