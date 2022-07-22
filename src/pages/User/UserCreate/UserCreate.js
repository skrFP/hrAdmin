import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import Dropzone from "react-dropzone"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"
import axios from "axios"
import { useFormik } from "formik"
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { addNewUser as onAddNewUser } from "store/users/actions"
//redux
import { useDispatch, useSelector } from "react-redux"
const UserCreate = () => {
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      lastName: "DarkSide",
      firstName: "World",
      email: "darkscary@gmail.com",
      location: "Монголын хаа нэгтэй ",
      humanId: "УШ99010101",
      phone: "99110401",
      point: "100",
      wallet: "1000000",
      password: "ihelp",
      authentication: false,
    },
    onSubmit: values => {
      const newUser = {
        lastName: values["lastName"],
        firstName: values["firstName"],
        email: values["email"],
        location: values["location"],
        phone: values["phone"],
        humanId: values["humanId"],
        point: values["point"],
        wallet: values["wallet"],
        password: values["password"],
        authentication: values.authentication,
      }
      dispatch(onAddNewUser(newUser))
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Хэрэглэгч шинээр үүсгэх</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Хэрэглэгч" breadcrumbItem="Үүсгэх" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">
                    Хэрэглэгч шинээр үүсгэх
                  </CardTitle>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="lastName"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэглэгчийн овог
                      </Label>
                      <Col lg="10">
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          className="form-control"
                          placeholder="Хэрэглэгчийн овог"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastName || ""}
                          invalid={
                            validation.touched.lastName &&
                            validation.errors.lastName
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="firstName"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэглэгчийн нэр
                      </Label>
                      <Col lg="10">
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          className="form-control"
                          placeholder="Хэрэглэгчийн нэр"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstName || ""}
                          invalid={
                            validation.touched.firstName &&
                            validation.errors.firstName
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="phone"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэгэлгчийн утас
                      </Label>
                      <Col lg="10">
                        <Input
                          id="phone"
                          name="phone"
                          type="text"
                          className="form-control"
                          placeholder="Хэрэгэлгчийн утас"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="email"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэглэгчийн и-мэйл
                      </Label>
                      <Col lg="10">
                        <Input
                          id="email"
                          name="email"
                          type="text"
                          className="form-control"
                          placeholder="Хэрэглэгчийн и-мэйл"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="humanId"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэглэгчийн рэгистэр
                      </Label>
                      <Col lg="10">
                        <Input
                          id="humanId"
                          name="humanId"
                          type="text"
                          className="form-control"
                          placeholder="Хэрэглэгчийн рэгистэр "
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.humanId || ""}
                          invalid={
                            validation.touched.humanId &&
                            validation.errors.humanId
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="location"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэглэгчийн хаяг
                      </Label>
                      <Col lg="10">
                        <Input
                          className="form-control"
                          id="location"
                          rows="3"
                          placeholder="location"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.location || ""}
                          invalid={
                            validation.touched.location &&
                            validation.errors.location
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="point"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэглэгчийн пойнт
                      </Label>
                      <Col lg="10">
                        <Input
                          id="point"
                          name="point"
                          type="text"
                          className="form-control"
                          placeholder="Хэрэглэгчийн пойнт"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.point || ""}
                          invalid={
                            validation.touched.point && validation.errors.point
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="wallet"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэглэгчийн хэтэвч
                      </Label>
                      <Col lg="10">
                        <Input
                          id="wallet"
                          name="wallet"
                          type="text"
                          className="form-control"
                          placeholder="Хэрэглэгчийн хэтэвч"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.wallet || ""}
                          invalid={
                            validation.touched.wallet &&
                            validation.errors.wallet
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="password"
                        className="col-form-label col-lg-2"
                      >
                        Хэрэглэгчийн нууц үг
                      </Label>
                      <Col lg="10">
                        <Input
                          id="password"
                          name="password"
                          type="text"
                          className="form-control"
                          placeholder="Хэрэглэгчийн нууц үг"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="password"
                        className="col-form-label col-lg-2"
                      >
                        Баталгаажсан болгох эсэх
                      </Label>
                      <Col lg="10">
                        <Input
                          name="authentication"
                          type="radio"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.authentication || true}
                        />{" "}
                        <Label check>Баталгаажсан болгох</Label>
                        <Input
                          name="authentication"
                          type="radio"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.authentication || false}
                        />{" "}
                        <Label check>Баталгаажаагүй болгох</Label>
                      </Col>
                    </FormGroup>
                    <Row className="justify-content-end">
                      <Col lg="10">
                        <Button type="submit" color="primary">
                          үүсгэх
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UserCreate
