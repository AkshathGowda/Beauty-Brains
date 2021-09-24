import './App.css';
import {Navbar, Container, Row, Col, Card, Button, Form, Image, Spinner} from 'react-bootstrap'
import firebaseDb from './firebase.js'
import firebase from 'firebase';
import {useState, useEffect} from 'react'

function App() {
  const [comment1, setComment1] = useState(['Great Shot']);
  const [comment1Input, setComment1Input] = useState('');
  const [comment1Like, setComment1Like] = useState(false);
  const [comment2, setComment2] = useState(['Amazing Shot']);
  const [comment2Input, setComment2Input] = useState('');
  const [comment2Like, setComment2Like] = useState(false);
  const [comment3Like, setComment3Like] = useState(false);
  const [adsData, setAdsData] = useState({});
  //const [firstKey , setFirstKey] = useState()

  useEffect(() => {
    firebase.database().ref('/ads').once('value',function(snapshot){
      snapshot.forEach(function(child){ 
        setAdsData(child.val())
      });
    })
  }, [])
  return (
    <div className="App">
      <Navbar>
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="/images/download.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              /> Ourgram
              
            </Navbar.Brand>
            <span class="navbar-icons">
              <i class="fas fa-home"></i>
              <i class="fas fa-inbox"></i>
              <i class="fas fa-bell"></i>
            </span>
          </Container>
        </Navbar>
        {!adsData &&
        <Container>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
        }
        <Container>
          <Row>
            <Col md="8">
              <div className="custom-top-margin">
                <Card>
                  <Card.Body>
                    <div className="custom-stories-section">
                      <Image src="/images/users/1.jpg" roundedCircle />
                      <Image src="/images/users/2.jpg" roundedCircle />
                      <Image src="/images/users/3.jpg" roundedCircle />
                      <span>No more stories.</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className="custom-top-margin">
                <Card>
                  <div className="custom-post-top">
                    <Image src="/images/users/1.jpg" roundedCircle /> <b>naturephotographer</b>
                  </div>
                  <Card.Img variant="top" src="/images/posts/1.jpg" />
                  <Card.Body>
                    <Card.Title>{!comment1Like && <i class="far fa-heart" onClick={() => setComment1Like(true)}></i> } {comment1Like && <span style={{color: 'red'}}><i class="fas fa-heart" onClick={() => setComment1Like(false)}></i></span> } <i class="far fa-comment"></i></Card.Title>
                    <Card.Text>
                      2399 likes
                      <div className="custom-user-caption">
                        <p>
                          <Image src="/images/users/1.jpg" roundedCircle /> <span>naturephotographer</span> Capturing the susnset.
                        </p>
                      </div>
                    </Card.Text>
                    <p style={{'color': '#ababab'}}>{comment1.length} comments</p>
                    <div className="custom-user-caption">
                      {comment1.map((comment, i) => 
                      <p>
                        <span>raj</span> {comment}.
                      </p>
                      )}
                                          
                    </div>
                    <div className="custom-comment">
                      <Form.Control type="email" placeholder="Add comment" onChange={e => setComment1Input(e.target.value)}/>
                      <span onClick={() => setComment1(oldArray => [...oldArray, comment1Input])}>Post</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="custom-top-margin">
                <Card>
                  <div className="custom-post-top">
                    <Image src="/images/users/2.jpg" roundedCircle /> <b>naturephotographer</b>
                  </div>
                  <Card.Img variant="top" src="/images/posts/2.jpg" />
                  <Card.Body>
                    <Card.Title>{!comment2Like && <i class="far fa-heart" onClick={() => setComment2Like(true)}></i> } {comment2Like && <span style={{color: 'red'}}><i class="fas fa-heart" onClick={() => setComment2Like(false)}></i></span> } <i class="far fa-comment"></i></Card.Title>
                    <Card.Text>
                      2399 likes
                      <div className="custom-user-caption">
                        <p>
                          <Image src="/images/users/1.jpg" roundedCircle /> <span>naturephotographer</span> Capturing the susnset.
                        </p>
                      </div>
                    </Card.Text>
                    <p style={{'color': '#ababab'}}>122 comments</p>
                    <div className="custom-user-caption">
                      {comment2.map((comment, i) => 
                      <p>
                        <span>raj</span> {comment}.
                      </p>
                      )}
                                          
                    </div>
                    <div className="custom-comment">
                      <Form.Control type="email" placeholder="Add comment" onChange={e => setComment2Input(e.target.value)}/>
                      <span onClick={() => setComment2(oldArray => [...oldArray, comment2Input])}>Post</span>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="custom-top-margin">
                <Card>
                  <div className="custom-post-top">
                    <Image src={adsData.fileLocationP} roundedCircle /> <b>{adsData.username}</b> <span style={{'color': '#0095f6'}}> sponsored</span>
                  </div>
                  <Card.Img variant="top" src={adsData.fileLocation} />
                  <a href={adsData.linkTo}>
                    <Card.Footer className="text-muted" style={{'cursor': 'pointer', 'text-decoration': 'none'}}>Visit Link <i class="fas fa-arrow-right"></i></Card.Footer>
                  </a>
                  <Card.Body>
                    <Card.Title>{!comment3Like && <i class="far fa-heart" onClick={() => setComment3Like(true)}></i> } {comment3Like && <span style={{color: 'red'}}><i class="fas fa-heart" onClick={() => setComment3Like(false)}></i></span> }</Card.Title>
                    <Card.Text>
                      2399 likes
                      <div className="custom-user-caption">
                        <p>
                          <Image src={adsData.fileLocationP} roundedCircle /> <span>{adsData.username}</span> {adsData.caption}
                        </p>
                      </div>
                    </Card.Text>
      
                  </Card.Body>
                </Card>
              </div>
            </Col>
            <Col md="4">
              <div className="custom-top-margin">
                <h6>Your Account</h6>
                <hr></hr>
                <div className="custom-post-top" style={{'display': 'flex', 'border-bottom': '0px', 'justifyContent': 'space-between', 'align-items': 'center'}}>
                  <div  style={{'display': 'flex'}}><Image src="/images/users/1.jpg" roundedCircle /> <span style={{'display': 'flex', 'flexDirection': 'column'}}><b>naturephotographer</b> <p>Raj Sharma</p></span></div> <span style={{'color': '#0095f6', 'padding': '4px'}}>Logout</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default App;
