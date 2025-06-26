import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Rate, } from 'antd';
import './ServiceProviders.css';
import { getAllLaborersByRating } from '../../../service/stylist-management-service.ts';
import stylist1 from "../../../assets/stylists/download (1).jpg";
import stylist2 from "../../../assets/stylists/download.jpg";
import stylist3 from "../../../assets/stylists/images (1).jpg";
import stylist4 from "../../../assets/stylists/images.jpg";

const { Title } = Typography;
interface Laborer {
    address: string;
    available: boolean;
    firstName: string;
    id: string;
    lastName: string;
    links: string;
    mobile: string;
    qualification: string;
    serviceArea: string;
    serviceType: string;
    stars: any,
}

const ServiceProviders: React.FC = () => {
    const [providers, setProviders] = useState<Laborer[]>([]);
    const images = [stylist1, stylist2, stylist3, stylist4];
    useEffect(() => {
        // Fetch laborers and update the state
        const fetchBestLaborers = async () => {
            try {
                const laborers = await getAllLaborersByRating();
                const limitedLaborers = laborers.response.slice(0, 4);
                setProviders(limitedLaborers)
            } catch (error) {
                console.error("Error fetching laborers:", error);
            }
        };

        fetchBestLaborers();
    }, []);

    return (
        <section className="serviceProvidersSection">

            <Row gutter={16} justify="center">


                {providers.map((provider, index) => (
                    <Col span={4} key={index} className={`providerCol ${index % 2 === 0 ? "up" : "down"}`}>
                        <div className="providerCard" >
                            {/* <div className="cardContent"> */}
                                {/* Circular image with border */}
                                <div className="imageContainer">
                                    <img src={images[index % images.length]} alt={provider.firstName} className="providerImage" />
                                </div>
                                {/* Provider details */}
                            <div className="providerDetails">
                                <Row >
                                <div className="providerName">{provider.firstName} {provider.lastName}</div>
                                <div className="providerService">{provider.serviceType}</div>
                                </Row>
                                    
                                    
                                <div className="providerRating">
                                        <Rate allowHalf value={provider.stars} disabled />
                                    </div>
                                    {/* <div className="providerWorks">{provider.works}+ Works</div> */}
                                </div>
                            {/* </div> */}
                        </div>
                    </Col>
                ))}
                <Col span={5} className="service-content">
                    <Title level={3} className="benefitsTitle">
                        
                        Meet Our Expert Stylists
                    </Title>
                    <span className="providers-title-1">Trusted Hands Behind Every Style </span>
                    <div className="services-providers-underline"></div>
                </Col>

            </Row>
        </section>
    );
};

export default ServiceProviders;
