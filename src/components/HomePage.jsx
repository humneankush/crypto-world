import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { CryptoCurrencies, News } from ".";
import { useGetCryptosQuery } from "../service/cryptoApi";
import Loading from "./Loading";

const { Title } = Typography;

function HomePage() {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return <Loading />;
  return (
    <>
      {/* top of the page fetch some details about crypto currencies */}
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic
            title="Total CryptoCurrencies"
            value={globalStats.total}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Market Cap:"
            value={millify(globalStats.totalMarketCap)}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            title="Total 24 Volume"
            value={millify(globalStats.total24hVolume)}
          ></Statistic>
        </Col>

        {/* <Col span={12} ><Statistic title="Total CryptoCurrencies" value={globalStats.total}></Statistic></Col> */}
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
      </Row>
      {/* top currencies */}
      <div className="home-heading-container">
        <Title className="home-title">Top 10 World Cryptos</Title>
        <Title className="show-more">
          <Link to="/cryptocurrencies">show more</Link>
        </Title>
      </div>
      {/* fetch only top 10 curreinces or in other componenen show all the currencies */}
      <CryptoCurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={5}>
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}

export default HomePage;
