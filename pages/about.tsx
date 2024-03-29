import type { NextPage } from "next";
import Head from "next/head";
import Layout from "components/Layout";
import Nav from "components/nav/Nav";

const AboutPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>
          About - North Shore Shop - Art and Music in Rogers Park Chicago
        </title>
        <meta
          name="description"
          content="About the North Shore Shop art and music shop in Rogers Park Chicago"
        />
      </Head>

      <Layout>
        <Nav />
        <div className="relative bg-indigo-800 my-16">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src="/images/back-panel-photo.jpg"
              alt=""
            />
            <div
              className="absolute inset-0 bg-indigo-800 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>
          <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get in touch
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-indigo-100">
              Mattis amet hendrerit dolor, quisque lorem pharetra. Pellentesque
              lacus nisi urna, arcu sociis eu. Orci vel lectus nisl eget eget ut
              consectetur. Sit justo viverra non adipisicing elit distinctio.
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AboutPage;
