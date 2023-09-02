import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import { useLoaderData, useNavigation } from "react-router-dom";
import image from "../assets/userImage.png";

const Home = () => {
  const navigation = useNavigation();

  const { data } = useLoaderData();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [singleUser, setSingleUser] = useState(null);

  if (navigation.state == "loading") {
    return <Spinner animation="border" variant="danger" />;
  }

  useEffect(() => {
    axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);
  return (
    <>
      <div className="text-center mt-4 fs-3 text-success">
        All Users No: {data.length}
      </div>
      <div>
        <div className="d-flex gap-5 mx-5">
          <div>
            {error && <p>{error}</p>}
            {loading && <Spinner animation="border" variant="danger" />}
            {users.slice(13, 24).map((user) => (
              <div key={user.id} className="mt-3">
                <Card border="success" style={{ width: "18rem" }}>
                  <Card.Header>{user?.profile?.username}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      <Button
                        onClick={() => setSingleUser(user)}
                        variant="success"
                      >
                        See Details
                      </Button>{" "}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <div>
            {singleUser && (
              <div className="mt-5 ms-5 position-fixed">
                <Card className="" style={{ width: "18rem" }}>
                  {singleUser?.avatar ? (
                    <Card.Img
                      variant="top"
                      src={singleUser?.avatar}
                      alt={singleUser?.profile?.username}
                      onError={(e) => {
                        e.target.src = image;
                        e.target.alt = error;
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <Card.Body>
                    <Card.Title>
                      Name:{" "}
                      {singleUser?.profile?.firstName +
                        " " +
                        singleUser?.profile?.lastName}
                    </Card.Title>
                    <Card.Text>Bio: {singleUser?.Bio}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Job: {singleUser?.jobTitle}</ListGroup.Item>
                    <ListGroup.Item>
                      email: {singleUser?.profile?.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Created : {singleUser?.createdAt}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
