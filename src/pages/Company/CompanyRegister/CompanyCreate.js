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
import { addNewCompany as onAddNewCompany } from "store/companys/actions"
//redux
import { useDispatch, useSelector } from "react-redux"
const CompanyCreate = () => {
  const dispatch = useDispatch()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "Скр тэч ХХК",
      email: "tselmen@gmail.com",
      location: "Монголын хаа нэгтэй ",
      register: "665666",
      phone: "97014400",
      point: "100",
      wallet: "1000000",
      password: "ihelp",
      authentication: false,
    },
    onSubmit: values => {
      const newCompany = {
        name: values["name"],
        email: values["email"],
        location: values["location"],
        phone: values["phone"],
        register: values["register"],
        point: values["point"],
        wallet: values["wallet"],
        password: values["password"],
        authentication: values.authentication,
      }
      dispatch(onAddNewCompany(newCompany))
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Компани шинээр үүсгэх</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Компани" breadcrumbItem="Үүсгэх" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Компани шинээр үүсгэх</CardTitle>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectname"
                        className="col-form-label col-lg-2"
                      >
                        Компани нэр
                      </Label>
                      <Col lg="10">
                        <Input
                          id="projectname"
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder="Компани нэр"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name
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
                        Компани утас
                      </Label>
                      <Col lg="10">
                        <Input
                          id="phone"
                          name="phone"
                          type="text"
                          className="form-control"
                          placeholder="Компани утас"
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
                        Компани и-мэйл
                      </Label>
                      <Col lg="10">
                        <Input
                          id="email"
                          name="email"
                          type="text"
                          className="form-control"
                          placeholder="Компани и-мэйл"
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
                        htmlFor="register"
                        className="col-form-label col-lg-2"
                      >
                        Компани рэгистэр
                      </Label>
                      <Col lg="10">
                        <Input
                          id="register"
                          name="register"
                          type="text"
                          className="form-control"
                          placeholder="Компани рэгистэр "
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.register || ""}
                          invalid={
                            validation.touched.register &&
                            validation.errors.register
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Компани хаяг
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
                        Компани пойнт
                      </Label>
                      <Col lg="10">
                        <Input
                          id="point"
                          name="point"
                          type="text"
                          className="form-control"
                          placeholder="Компани пойнт"
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
                        Компани хэтэвч
                      </Label>
                      <Col lg="10">
                        <Input
                          id="wallet"
                          name="wallet"
                          type="text"
                          className="form-control"
                          placeholder="Компани хэтэвч"
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
                        Компани нууц үг
                      </Label>
                      <Col lg="10">
                        <Input
                          id="password"
                          name="password"
                          type="text"
                          className="form-control"
                          placeholder="Компани нууц үг"
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
                        Идэвхтэй болгох эсэх
                      </Label>
                      <Col lg="10">
                        <Input
                          name="authentication"
                          type="radio"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.authentication || true}
                        />{" "}
                        <Label check>Идэвхтэй болгох</Label>
                        <Input
                          name="authentication"
                          type="radio"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.authentication || false}
                        />{" "}
                        <Label check>Идэвхгүй болгох</Label>
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

export default CompanyCreate
