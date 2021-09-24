import {Navbar, Container, Row, Col, Card, Button, Form, Image, Spinner} from 'react-bootstrap'
import firebaseDb from './firebase.js'
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import {useState, useEffect} from 'react'
import './Admin.css'

const Admin = () => {
    const [formData, setFormData] = useState({});
    const [adsData, setAdsData] = useState({});
    const [uploadStatus, setUploadStatus] = useState(0);
    const [progress, setProgress] = useState(0)

    const [uploadStatusP, setUploadStatusP] = useState(0);
    const [progressP, setProgressP] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        firebaseDb.child('ads').on('value', snapshot => {
            if (snapshot.val() != null) {
                setAdsData({
                    ...snapshot.val()
                })
                console.log(adsData)
            }
                
        })
    }, [])

    const updateAfterDelete = () => {
        setAdsData({})
        firebaseDb.child('ads').on('value', snapshot => {
            if (snapshot.val() != null) {
                setAdsData({
                    ...snapshot.val()
                })
                console.log(adsData)
            }
                
        })
    }

    const addData = () =>{
        setIsLoading(true)
        firebaseDb.child('ads').push(
        {
            caption: formData.caption,
            fileLocation: formData.fileLocation,
            fileLocationP: formData.fileLocationP,
            linkType: formData.linkType,
            linkTo: formData.linkTo,
            username: formData.username
        },
        err => {
            if (err)
                console.log(err)
            else
                setIsLoading(false)
        })
        console.log('Success')
    }
    const handleUploadSuccess = filename => {
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                setFormData({...formData, fileLocation: url})
                setUploadStatus(2)
            });
    };
    const handleUploadError = error => {
        console.error(error);
    };

    const handleUploadSuccessP = filename => {
        firebase
            .storage()
            .ref("profileimages")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                setFormData({...formData, fileLocationP: url})
                setUploadStatusP(2)
            });
    };
    const handleUploadErrorP = error => {
        console.error(error);
    };


    const deleteData = key => {
        console.log(key)
        if (window.confirm('Are you sure to delete this record?')) {
            debugger
            firebaseDb.child(`ads/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        updateAfterDelete()
                   
                }
            )
        }
    }
    return ( 
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">
                    <img
                        src="/images/download.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /> Ourgram Ads Manager
                    
                    </Navbar.Brand>
                    <span class="navbar-icons">
                    <i class="fas fa-bell"></i>
                    </span>
                </Container>
            </Navbar>
            <Container>
                <div className="custom-top-margin">
                    <Card>
                        <Container>
                            <Card.Title style={{marginTop: '8px'}}>Create ad ad</Card.Title>
                            <hr></hr>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Caption</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Caption" onChange={e => setFormData({...formData, caption: e.target.value})}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username to be displayed in ad" onChange={e => setFormData({...formData, username: e.target.value})}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Upload Profile Image</Form.Label>
                                    <br></br>
                                    <FileUploader
                                        accept="image/*"
                                        name="avatar"
                                        randomizeFilename
                                        storageRef={firebase.storage().ref("profileimages")}
                                        onUploadStart={() => {setUploadStatusP(1)}}
                                        onUploadError={handleUploadErrorP}
                                        onUploadSuccess={handleUploadSuccessP}
                                        onProgress={p => setProgress(p)}
                                    />
                                    { uploadStatusP==1 && <span style={{float: 'right'}}>Uploading ( {progress}%)...</span> }
                                    { uploadStatusP==2 && <span style={{float: 'right'}}>Success!</span> }
                                    { uploadStatusP==2 &&
                                    <Row>
                                        <Col xs={6} md={4}>
                                            <h6 className="custom-top-margin">Image Preview</h6>
                                            <div className="profile-img"> 
                                                <Image src={formData.fileLocationP} roundedCircle />
                                            </div>
                                        </Col>
                                    </Row>
                                    }
                                    
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Upload Image</Form.Label>
                                    <br></br>
                                    <FileUploader
                                        accept="image/*"
                                        name="avatar"
                                        randomizeFilename
                                        storageRef={firebase.storage().ref("images")}
                                        onUploadStart={() => {setUploadStatus(1)}}
                                        onUploadError={handleUploadError}
                                        onUploadSuccess={handleUploadSuccess}
                                        onProgress={p => setProgress(p)}
                                    />
                                    { uploadStatus==1 && <span style={{float: 'right'}}>Uploading ( {progress}%)...</span> }
                                    { uploadStatus==2 && <span style={{float: 'right'}}>Success!</span> }
                                    { uploadStatus==2 &&
                                    <Row>
                                        <Col xs={6} md={4}>
                                            <h6 className="custom-top-margin">Image Preview</h6>
                                            <Image className="profile-img" src={formData.fileLocation} rounded />
                                        </Col>
                                    </Row>
                                    }
                                    
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Select Link</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={e => setFormData({...formData, linkType: e.target.value})}>
                                        <option>Open this select menu</option>
                                        <option value="1">Shop Now</option>
                                        <option value="2">Learn More</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={e => setFormData({...formData, linkTo: e.target.value})}>
                                    <Form.Label>Link</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Link" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    {!isLoading ?
                                    <Button variant="primary" onClick={addData}>Add</Button>
                                    :                                   
                                    <Button variant="primary" disabled>
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        <span className="visually-hidden">Adding...</span>
                                    </Button>
                                    }
                                </Form.Group>
                            </Form>
                        </Container>
                    </Card>
                </div>
                <div className="custom-top-margin">
                    <Card>
                        <Container>
                            <Card.Title style={{marginTop: '8px'}}>Active ads</Card.Title>
                            <hr></hr>
                            {Object.keys(adsData).length==0 && <h6>No Ads Running</h6>}
                            {Object.keys(adsData).map(function(keyName, keyIndex) {
                                return (
                                    <div key={keyName} className="adsList">
                                        <Row style={{alignItems: 'center'}}>
                                            <Col md="4">
                                                <Image src={adsData[keyName].fileLocation} thumbnail />
                                            </Col>
                                            <Col md="6">
                                                <span style={{marginLeft: '8px'}}> {adsData[keyName].caption}</span>
                                            </Col>
                                            <Col md="2">
                                                <div style={{float: 'right'}}> <Button variant="danger" onClick={() => deleteData(keyName)}>Delete</Button> </div>
                                            </Col>   
                                        </Row>                                     
                                        <hr></hr>
                                    </div>
                                    
                                )
                            })}

                        </Container>
                    </Card>
                </div>
            </Container>
        </>
    );
}
 
export default Admin;