import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="aboutImg" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who we are</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            ad et eius obcaecati voluptate quas, est possimus aspernatur dolore
            facilis vitae, molestiae eum vero soluta ipsa accusantium cupiditate
            similique illum alias? Cum, reprehenderit. Officiis recusandae
            obcaecati in aperiam reprehenderit quas mollitia, excepturi, quaerat
            delectus quod suscipit, tempore sequi doloribus aliquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, sit.
          </p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
            obcaecati, ea architecto natus distinctio sed voluptatum libero et
            itaque fugiat magni aperiam voluptatibus earum ut culpa ipsum
            excepturi, totam sit ratione. Enim nesciunt ipsa explicabo.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
            illo. Atque, odio.
          </p>
          <p>Lorem, ipsum dolor.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
