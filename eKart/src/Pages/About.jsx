import React from "react";
import Navbar from "../Sections/Navbar";

import BannerImg from "../Components/BannerImg";
import { Helmet } from "react-helmet";
import logo from "../assets/images/logo.png";
import Footer from "../Sections/Footer";
const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Fashion Nana| Korpaut Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <section className="mx-auto flex w-[99.9%] flex-col justify-center border bg-slate-200 p-2 md:flex-row">
        <div className="space-y-6 rounded-sm bg-white p-3 md:w-[60%]">
          <h1 className="font-cursive text-5xl">Fashion Nana, Koraput</h1>
          <p>
            We are the fastest growing eCommerce Store in Koraput. We provide
            the latest and trendy Fashionable Dresses. The catch is we only
            provide dress for Boys and Mens. We are going to introduce Women's
            wear very soon. Just keep in touch with us. Now you can choose a
            variety of dresses here staritng from T-Shirts, Oversized Shirts,
            Drop Shoulder Shirts, Hoodies, Winter wear, Jeans, Trousers, Sports
            Wear and many more. We never compromise in our Quality and we
            provide you the best-in-class and Quality clothes only. For now we
            are providing COD delivery only. Now proceed forward and Continue
            your shopping.

            Thank You
          </p>
        </div>

        <div className="relative w-full bg-white md:w-[30%]">
          <img src={logo} alt="Logo" className="w-full md:absolute" />
        </div>
      </section>
      <section className="mx-auto flex w-[99.9%] flex-col justify-center border bg-slate-200 p-2 md:flex-row-reverse">
        <div className="space-y-6 rounded-sm bg-white p-3 md:w-[60%]">
          <h1 className="font-cursive text-5xl">Fashion Nana, Koraput</h1>
          <p>
          କୋରାପୁଟରେ ଆମେ ସବୁଠାରୁ ବୃଦ୍ଧିଶୀଳ ଇ-କମର୍ସ ଦୋକାନ ରୂପେ ଚିହ୍ନଟ ହୋଇଛୁ। ଆମେ ଆପଣଙ୍କୁ ସବୁଠୁ ନୂତନ ଓ ରୂପାନ୍ତର ଫ୍ୟାସନେବଲ୍ ପୋଶାକ ପ୍ରଦାନ କରୁଛୁ। ବିଶେଷତଃ ଆମର ଧ୍ୟାନ କେବଳ ପୁରୁଷ ଓ ମହିଳା ପୋଶାକ ଉପରେ ଅଛି। ବର୍ତ୍ତମାନ କେବଳ ପୁରୁଷ ପୋଷାକ ଉପଲବ୍ଧ ଅଛି , କିନ୍ତୁ ଖୁବ୍ ଶୀଘ୍ର ଆମେ ମହିଳାଙ୍କ ପୋଶାକ ମଧ୍ୟ ଉପଲବ୍ଧ କରିବାକୁ ଯାଉଛୁ। ତେଣୁ ଆମ ସହିତ ଯୋଡ଼ିତ ରୁହନ୍ତୁ। ବର୍ତ୍ତମାନ ଆପଣ ଆମର ଦୋକାନରୁ ବିଭିନ୍ନ ପୋଶାକ ଚୟନ କରିପାରିବେ ଯାହାର ମଧ୍ୟରେ ରହିଛି ଟି-ଶର୍ଟ, ଓଭରସାଇଜ୍ ଶର୍ଟ, ଡ୍ରପ୍ ଶୋଲ୍ଡର ଶର୍ଟ, ହୁଡି, ଶୀତ ପୋଶାକ, ଜିନ୍ସ, ଟ୍ରାଉଜର, ଖେଳ ପୋଶାକ ଇତ୍ୟାଦି। ଆମେ କୌଣସି ପରିସ୍ଥିତିରେ ଗୁଣବତ୍ତାକୁ କମ କରୁନାହିଁ, ଆମେ ଆପଣଙ୍କୁ ଶ୍ରେଷ୍ଠ ଗୁଣବତ୍ତା ଓ ବିଶ୍ୱସନୀୟ ପୋଶାକ ଦେବାକୁ ପ୍ରତିବଦ୍ଧ। ବର୍ତ୍ତମାନ ଆମେ କେବଳ ନଗଦ ଦେଇ ଡିଲିଭେରି ସୁବିଧା ପ୍ରଦାନ କରୁଅଛୁ ।ଏବେ ଆଗକୁ ବଢ଼ନ୍ତୁ ଓ ଆପଣଙ୍କର ଖରିଦ ଜାରି ରଖନ୍ତୁ।

ଧନ୍ୟବାଦ

          </p>
        </div>

        <div className="relative w-full bg-white md:w-[30%]">
          <img src={logo} alt="Logo" className="w-full md:absolute" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
