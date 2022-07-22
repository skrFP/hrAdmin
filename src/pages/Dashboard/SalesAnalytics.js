import React, { useEffect } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import { getUsers as onGetUsers } from "store/users/actions"
import { getCompanys as onGetCompanys } from "store/companys/actions"
import { useSelector, useDispatch } from "react-redux"
const SalesAnalytics = props => {
  const dispatch = useDispatch()

  const { users } = useSelector(state => ({
    users: state.users.users,
  }))
  const { companys } = useSelector(state => ({
    companys: state.companys.companys,
  }))
  useEffect(() => {
    if (companys && !companys.length) {
      dispatch(onGetCompanys())
    }
  }, [dispatch, companys])
  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers())
    }
  }, [dispatch, users])
  const companysLength = companys.length
  const usersLength = users.length
  const series = [usersLength, companysLength]
  const options = {
    labels: ["Хувь хүн", "Компани"],
    colors: ["#556ee6", "#34c38f"],
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  }

  return (
    <React.Fragment>
      <Col xl="4">
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Бүртгүүлэгчдийн график</h4>

            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                  height={260}
                  className="apex-charts"
                />
              </div>
            </div>

            <div className="text-center text-muted">
              <Row>
                <Col xs="6">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-primary me-1" /> Хувь
                      хүн A
                    </p>
                    <h5>{usersLength}</h5>
                  </div>
                </Col>
                <Col xs="6">
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Компани
                      B
                    </p>
                    <h5>{companysLength}</h5>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default SalesAnalytics
