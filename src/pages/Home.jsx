import React, { useLayoutEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import BlogSection from "../components/BlogSection";
import MainSlider from "../components/MainSlider";
import Loader from "../components/utils/Loader";
import "swiper/css";
import "swiper/css/scrollbar";

import CatalogSection from "../components/CatalogSection";
import { getSales } from "../services/sales";

const Home = () => {
  const [sales, setSales] = useState({
    loading: true,
    home: [],
    ad: [],
  });

  useLayoutEffect(() => {
    getSales()
      .then(
        (res) =>
          res &&
          setSales((prev) => ({
            ...prev,
            loading: false,
            ...res,
          }))
      )
      .finally(() => setSales((prev) => ({ ...prev, loading: false })));
  }, []);

  if (sales.loading) {
    return <Loader full />;
  }

  return (
    <>
      <Container>
        <section className="mb-6">
          <MainSlider data={sales.home.items} />
        </section>
      </Container>

      <CatalogSection />

      <Container>
        <BlogSection />
      </Container>
    </>
  );
};

export default Home;
