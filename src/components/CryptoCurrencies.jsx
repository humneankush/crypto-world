import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";

import { useGetCryptosQuery } from "../service/cryptoApi";
import { useState, useEffect } from "react";
import Loading from "./Loading";

function CryptoCurrencies({ simplified }) {
  // set simplified for home page and for all the currencies by default simplified is true
  const count = simplified ? 10 : 100;

  // fetch data from the api using service set in the data
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  //
  const [cryptos, setCryptos] = useState([]);

  // search for specific currency
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const filterdData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setCryptos(filterdData);
  }, [cryptosList, searchItem]);

  if (isFetching) return <Loading />;

  return (
    <>
      {/* by default it fetch only 10 currencies */}
      {!simplified && (
        <>
          <Typography.Title level={2} className="heading">
            All Available Currencies
          </Typography.Title>
          <div className="search-crypto">
            <Input
              placeholder="search crytpcurrencies"
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
        </>
      )}

      {/* showing 4 cards on home page  */}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={
                  <img className="crypto-image" alt="" src={currency.iconUrl} />
                }
                hoverable
              >
                <p>Price: {millify(currency.price) + "$"}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>

                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default CryptoCurrencies;
