import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTickers } from "../api";
import styled from "styled-components";
import { ImArrowUp2, ImArrowDown2 } from "react-icons/im";
import { FiMinus } from "react-icons/fi";
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";

interface PriceProps {
  coinId: string;
}

interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
    rank: number;
    symbol: string;
    total_supply: number;
  };
}

interface IPriceData {
  close: number;
  high: string;
  low: string;
  market_cap: number;
  open: number;
  time_close: number;
  time_open: number;
  volume: string;
}

const IsLoading = styled.div`
  text-align: center;
  color: ${(props) => props.theme.accentColor};
`;

const Ohlc = styled.div`
  display: flex;
  padding: 0px 0px 3px 0px;
  margin: 10px auto;
  justify-content: space-around;
`;

const OverViewItem = styled.div`
  color: black;
`;

const OverViewItem2 = styled.div`
  color: black;
`;

const PerCentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
`;

const Percent = styled.div`
  text-align: center;
  font-weight: bold;
`;

const Details = styled.div`
  display: flex;
  opacity: 0;
  border-radius: 10px;
  position: absolute;
  margin-top: 500px;
  box-shadow: 0 4px 5px rgba(119, 118, 118, 0.6);
  align-items: center;
  pointer-events: none;
  transition: all 0.6s ease-in-out;
  flex-direction: column;
`;

const OverView = styled.div`
  cursor: pointer;
  background-color: #dfcccf73;
  display: flex;
  padding: 15px 0px 15px 0px;
  margin: 10px auto;
  border-radius: 10px;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 5px rgba(119, 118, 118, 0.6);
  transition: 0.5s;
  &:hover {
    background-color: #eebac0;
    transition: 0.5s;
    ${Details} {
      opacity: 100;
      transition: 1s;
      margin-top: 290px;
      background-color: #bdcde6b0;
      pointer-events: inherit;
    }
  }
`;

const PercentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
`;

const PercentData = styled.div<{ isPositive: number | undefined }>`
  margin: 10px 10px 10px 10px;
  background-color: #e4d0d4d6;
  box-shadow: 0 4px 5px rgba(119, 118, 118, 0.6);
  border-radius: 5px;
  width: 140px;
  height: 100px;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: ${(props) =>
    props.isPositive === 0
      ? "gray"
      : props.isPositive && props.isPositive > 0
      ? "green"
      : "red"};
`;

const PercentDataIcon = styled.div``;

const Percentage = styled.div`
  margin-left: 10px;
`;

const PercentDataHeader = styled.article`
  color: black;
`;

const PercentDataBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<IPriceData[]>(
    ["ohlcvPrice", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const { data: tickersData } = useQuery<ITickersData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      {isLoading ? (
        <IsLoading>Loading Price...</IsLoading>
      ) : (
        <>
          <Ohlc>
            <OverViewItem2>Date</OverViewItem2>
            <OverViewItem2>Open</OverViewItem2>
            <OverViewItem2>High</OverViewItem2>
            <OverViewItem2>Low</OverViewItem2>
            <OverViewItem2>Close</OverViewItem2>
          </Ohlc>
          {data
            ?.map((price) => (
              <div key={price.time_open}>
                <OverView>
                  <OverViewItem style={{ fontWeight: "bold" }}>
                    {
                      new Date(
                        price.time_open * 1000
                      ).toLocaleDateString() as any
                    }
                  </OverViewItem>
                  <OverViewItem>${price.open}</OverViewItem>
                  <OverViewItem>${price.high}</OverViewItem>
                  <OverViewItem>${price.low}</OverViewItem>
                  <OverViewItem style={{ fontWeight: "bolder" }}>
                    ${price.close}
                    <Percent>
                      {(
                        ((price.close - price.open) / price.open) *
                        100
                      ).toFixed(2) > "0" ? (
                        <PerCentContainer>
                          <ImArrowUp2 style={{ color: "green" }} />
                          <Percent style={{ color: "green" }}>
                            {`+${(
                              ((price.close - price.open) / price.open) *
                              100
                            ).toFixed(2)}%`}
                          </Percent>
                        </PerCentContainer>
                      ) : (
                        <PerCentContainer>
                          <ImArrowDown2 style={{ color: "red" }} />
                          <Percent style={{ color: "red" }}>
                            {`${(
                              ((price.close - price.open) / price.open) *
                              100
                            ).toFixed(2)}%`}
                          </Percent>
                        </PerCentContainer>
                      )}
                    </Percent>
                  </OverViewItem>
                  {price.time_open < data[20]?.time_open ? (
                    ""
                  ) : (
                    <Details>
                      <PercentWrapper>
                        <PercentData
                          isPositive={tickersData?.quotes.USD.percent_change_1h}
                        >
                          <PercentDataHeader>1h ago</PercentDataHeader>
                          <PercentDataBox>
                            <PercentDataIcon>
                              {tickersData?.quotes.USD.percent_change_1h !==
                              undefined ? (
                                tickersData?.quotes.USD.percent_change_1h >
                                0 ? (
                                  <TfiStatsUp size="50" />
                                ) : tickersData.quotes.USD.percent_change_1h ===
                                  0 ? (
                                  <FiMinus
                                    style={{ color: "grey" }}
                                    size="50"
                                  />
                                ) : (
                                  <TfiStatsDown size="50" />
                                )
                              ) : (
                                ""
                              )}
                            </PercentDataIcon>
                            <Percentage>
                              {tickersData?.quotes.USD.percent_change_1h}%
                            </Percentage>
                          </PercentDataBox>
                        </PercentData>
                        <PercentData
                          isPositive={tickersData?.quotes.USD.percent_change_6h}
                        >
                          <PercentDataHeader>6h ago</PercentDataHeader>
                          <PercentDataBox>
                            <PercentDataIcon>
                              {tickersData?.quotes.USD.percent_change_6h !==
                              undefined ? (
                                tickersData?.quotes.USD.percent_change_6h >
                                0 ? (
                                  <TfiStatsUp size="50" />
                                ) : tickersData.quotes.USD.percent_change_6h ===
                                  0 ? (
                                  <FiMinus
                                    style={{ color: "grey" }}
                                    size="50"
                                  />
                                ) : (
                                  <TfiStatsDown size="50" />
                                )
                              ) : (
                                ""
                              )}
                            </PercentDataIcon>
                            <Percentage>
                              {tickersData?.quotes.USD.percent_change_6h}%
                            </Percentage>
                          </PercentDataBox>
                        </PercentData>
                        <PercentData
                          isPositive={
                            tickersData?.quotes.USD.percent_change_24h
                          }
                        >
                          <PercentDataHeader>24h ago</PercentDataHeader>
                          <PercentDataBox>
                            <PercentDataIcon>
                              {tickersData?.quotes.USD.percent_change_24h !==
                              undefined ? (
                                tickersData?.quotes.USD.percent_change_24h >
                                0 ? (
                                  <TfiStatsUp size="50" />
                                ) : tickersData.quotes.USD
                                    .percent_change_24h === 0 ? (
                                  <FiMinus
                                    style={{ color: "grey" }}
                                    size="50"
                                  />
                                ) : (
                                  <TfiStatsDown size="50" />
                                )
                              ) : (
                                ""
                              )}
                            </PercentDataIcon>
                            <Percentage>
                              {tickersData?.quotes.USD.percent_change_24h}%
                            </Percentage>
                          </PercentDataBox>
                        </PercentData>
                      </PercentWrapper>
                      <PercentWrapper>
                        <PercentData
                          isPositive={tickersData?.quotes.USD.percent_change_7d}
                        >
                          <PercentDataHeader>7d ago</PercentDataHeader>
                          <PercentDataBox>
                            <PercentDataIcon>
                              {tickersData?.quotes.USD.percent_change_7d !==
                              undefined ? (
                                tickersData?.quotes.USD.percent_change_7d >
                                0 ? (
                                  <TfiStatsUp size="50" />
                                ) : tickersData.quotes.USD.percent_change_7d ===
                                  0 ? (
                                  <FiMinus
                                    style={{ color: "grey" }}
                                    size="50"
                                  />
                                ) : (
                                  <TfiStatsDown size="50" />
                                )
                              ) : (
                                ""
                              )}
                            </PercentDataIcon>
                            <Percentage>
                              {tickersData?.quotes.USD.percent_change_7d}%
                            </Percentage>
                          </PercentDataBox>
                        </PercentData>
                        <PercentData
                          isPositive={
                            tickersData?.quotes.USD.percent_change_30d
                          }
                        >
                          <PercentDataHeader>30d ago</PercentDataHeader>
                          <PercentDataBox>
                            <PercentDataIcon>
                              {tickersData?.quotes.USD.percent_change_30d !==
                              undefined ? (
                                tickersData?.quotes.USD.percent_change_30d >
                                0 ? (
                                  <TfiStatsUp size="50" />
                                ) : tickersData.quotes.USD
                                    .percent_change_30d === 0 ? (
                                  <FiMinus
                                    style={{ color: "grey" }}
                                    size="50"
                                  />
                                ) : (
                                  <TfiStatsDown size="50" />
                                )
                              ) : (
                                ""
                              )}
                            </PercentDataIcon>
                            <Percentage>
                              {tickersData?.quotes.USD.percent_change_30d}%
                            </Percentage>
                          </PercentDataBox>
                        </PercentData>
                        <PercentData
                          isPositive={tickersData?.quotes.USD.percent_change_1y}
                        >
                          <PercentDataHeader>1y ago</PercentDataHeader>
                          <PercentDataBox>
                            <PercentDataIcon>
                              {tickersData?.quotes.USD.percent_change_1y !==
                              undefined ? (
                                tickersData?.quotes.USD.percent_change_1y >
                                0 ? (
                                  <TfiStatsUp size="50" />
                                ) : tickersData.quotes.USD.percent_change_1y ===
                                  0 ? (
                                  <FiMinus color="grey" size="50" />
                                ) : (
                                  <TfiStatsDown size="50" />
                                )
                              ) : (
                                ""
                              )}
                            </PercentDataIcon>
                            <Percentage>
                              {tickersData?.quotes.USD.percent_change_1y}%
                            </Percentage>
                          </PercentDataBox>
                        </PercentData>
                      </PercentWrapper>
                    </Details>
                  )}
                </OverView>
              </div>
            ))
            .reverse()}
        </>
      )}
    </>
  );
};

export default Price;
