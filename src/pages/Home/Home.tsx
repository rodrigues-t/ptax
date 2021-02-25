import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {

    return (
        <>
            <Row className="mb-2">
                <Col>
                    <Card bg="secondary" text="white" className="h-100">
                        <Card.Body>
                            Histórico de cotações PTAX de diversas moedas pelo Banco Central do Brasil.
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md="6" className="mb-1 mb-md-0">
                    <Card bg="dark" text="white" className="h-100">
                        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Card.Title>Cotação por dia</Card.Title>
                            <Card.Text>
                                Escolha uma data e a moeda e veja as cotações PTAX de abertura, intermediárias e de fechamento, incluindo valor de compra e venda.
                            </Card.Text>
                            <div>
                                <LinkContainer exact to="/dia">
                                    <Button variant="info">Ver agora <FontAwesomeIcon icon="arrow-right" /></Button>
                                </LinkContainer>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="6">
                    <Card bg="dark" text="white" className="h-100">
                        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Card.Title>Cotação por período</Card.Title>
                            <Card.Text>
                                Escolha duas datas e a moeda e veja as cotações PTAX de fechamento para cada dia de neogiação entre as datas escolhidas, incluindo valor de compra e venda.
                            </Card.Text>
                            <div>
                                <Button disabled variant="info">Em breve <FontAwesomeIcon icon={faClock} /></Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Home;