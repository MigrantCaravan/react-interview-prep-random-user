import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [info, setinfo] = useState([]);
  const [userInfos, setuserInfos] = useState([]);
  const [page, setpage] = useState(1);
  const [nextPageNumber, setnextPageNumber] = useState(1);
  const url = `https://randomuser.me/api/?page=${page}&results=1`;

  function handleClick() {
    setCount(count + 1);
  }

  function handleClick2() {
    setCount(count - 1);
  }

  function handleClick3() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setpage(page + 1);
        setinfo(data.results);
        const newUserInfos = [...userInfos, ...data.results];
        setuserInfos(newUserInfos);
        setnextPageNumber(data.info.page + 1);
      });
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setinfo(data);
        setuserInfos(data.results);
        console.log("DATA", data);
        setnextPageNumber(data.info.page + 1);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      {/* this is for a single user from the api */}
      {/* {typeof info.results === "undefined" ? (
        <div></div>
      ) : (
        <UserWrapper>
          <div>{info.results[0].name.first}</div>
          <div>{info.results[0].name.last}</div>
          <div>{info.results[0].email}</div>
          <div>{info.results[0].phone}</div>
          <img alt="imagen de algo" src={info.results[0].picture.thumbnail} />
        </UserWrapper>
      )} */}
      <button onClick={handleClick}>increment</button>
      <button onClick={handleClick2}>decrement</button>
      <button onClick={handleClick3}>Fetch More users from page</button>
      <div>{count}</div>
      {/* this is for an array of user from the API */}
      {userInfos.map((user, index) => {
        return (
          <MapWrapper key={index}>
            <div>{user.name.first}</div>
            <div>{user.name.last}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <img alt="imagenes de algo" src={user.picture.thumbnail} />
          </MapWrapper>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #678983;
  background-image: url("https://www.transparenttextures.com/patterns/60-lines.png");
  /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const UserWrapper = styled.div`
  background-color: red;
`;
const MapWrapper = styled.div`
  background-color: #e6ddc4;
  background-image: url("https://www.transparenttextures.com/patterns/asfalt-dark.png");
  /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
  border-bottom: solid 4px black;
  border-radius: 6px;
`;

export default App;
