import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
} from "reactstrap"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { useFormik } from "formik"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getCompanys as onGetCompanys,
  deleteCompany as onDeleteCompany,
} from "store/companys/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const CompanySpecialController = props => {
  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // validation
  const token = localStorage.getItem("token")
  const headers = {
    Authorization: `Bearer ` + token,
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (contact && contact.id) || "",
      name: (contact && contact.name) || "",
      special: (contact && contact.special) || 0,
    },

    onSubmit: values => {
      axios
        .put(
          `http://128.199.128.37/api/v1/cvs/setting/${contact.id}`,
          {
            special: values.special,
          },
          { headers }
        )
        .then(result => {
          console.log(...result.data.data)
        })
        .catch(error => {
          console.log(error)
        })
      validation.resetForm()
      setIsEdit(false)
      toggle()
    },
  })

  const { companys } = useSelector(state => ({
    companys: state.companys.companys,
  }))

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search
  const sizePerPage = 10
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: companys.length, // replace later with size(companys),
    custom: true,
  }
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ]

  const contactListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: index => <>{index}</>,
    },

    {
      text: "Компани нэр",
      dataField: "name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, company) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {company.name}
            </Link>
          </h5>
        </>
      ),
    },

    {
      dataField: "special",
      text: "Компани онцгой эрх",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, company) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link
              to="#"
              className={
                company.isSpecial === true ? "text-success" : "text-danger"
              }
            >
              {company.special}
            </Link>
          </h5>
        </>
      ),
    },

    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Тохиргоо",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, company) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleCompanyClick(company)}
            ></i>
          </Link>
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(company)}
            ></i>
          </Link>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (companys && !companys.length) {
      dispatch(onGetCompanys())
      setIsEdit(false)
    }
  }, [dispatch, companys])

  useEffect(() => {
    setContact(companys)
    setIsEdit(false)
  }, [companys])

  useEffect(() => {
    if (!isEmpty(companys) && !!isEdit) {
      setContact(companys)
      setIsEdit(false)
    }
  }, [companys])

  const toggle = () => {
    setModal(!modal)
  }

  const handleCompanyClick = arg => {
    const company = arg
    console.log(company)
    setContact({
      id: company._id,
      name: company.name,
      point: company.point,
      wallet: company.wallet,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = companys => {
    setContact(companys)
    setDeleteModal(true)
  }

  const handleDeleteCompany = () => {
    dispatch(onDeleteCompany(contact._id))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCompany}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Компани онцлох</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Компани" breadcrumbItem="Компани онцлох эрх" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={companys}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={companys}
                          columns={contactListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit User" : "Add User"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={e => {
                                            e.preventDefault()
                                            validation.handleSubmit()
                                            return false
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  Компани нэр
                                                </Label>
                                                <Input
                                                  name="name"
                                                  type="text"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values.name || ""
                                                  }
                                                  invalid={
                                                    validation.touched.name &&
                                                    validation.errors.name
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">
                                                  special
                                                </Label>
                                                <Input
                                                  name="special"
                                                  label="special"
                                                  type="number"
                                                  onChange={
                                                    validation.handleChange
                                                  }
                                                  onBlur={validation.handleBlur}
                                                  value={
                                                    validation.values.special ||
                                                    undefined
                                                  }
                                                  invalid={
                                                    validation.touched
                                                      .special &&
                                                    validation.errors.special
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                  Save
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )
                    }}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(CompanySpecialController)
