import { Col, Typography, Row, Avatar, Collapse } from "antd";
import { useGetCryptoExchangeQuery } from "../service/cryptoApi";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import Loading from "./Loading";

const { Text } = Typography;
const { Panel } = Collapse;

function Exchanges() {
  const { data, isFetching } = useGetCryptoExchangeQuery();
  const exchangeList = data?.data?.exchanges;

  if (isFetching) return <Loading />;
  return (
    <Col>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>

        <Col span={6}>Markets</Col>

        <Col span={6}>Change</Col>
      </Row>
      {exchangeList.map((exchange) => (
        <Col span={24}>
          <Collapse>
            <Panel
              key={exchange.id}
              showArrow={false}
              header={
                <Row key={exchange.id}>
                  <Col span={6}>
                    <Text strong>{exchange.rank}.</Text>
                    <Avatar
                      className="exchange-image"
                      src={exchange.iconUrl}
                    ></Avatar>
                    <Text strong>{exchange.name}</Text>
                  </Col>
                  <Col span={6}>${millify(exchange.volume)}</Col>
                  <Col span={6}>{millify(exchange.numberOfMarkets)}k</Col>
                  <Col span={6}>{millify(exchange.marketShare)}%</Col>
                </Row>
              }
            >
              {HTMLReactParser(exchange.description || "")}
            </Panel>
          </Collapse>
        </Col>
      ))}
    </Col>
  );
}

export default Exchanges;
