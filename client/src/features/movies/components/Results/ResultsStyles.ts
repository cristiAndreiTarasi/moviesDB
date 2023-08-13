import styled from 'styled-components';

const StyledList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 100px;
    justify-content: center;
`;

const StyledCard = styled.div`
    position: relative;
    min-height: 300px; 
    min-width: 150px; 
    height: 400px; 
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.8), transparent);
    height: 100px;
`;

const CenteredContent = styled.div`
    position: absolute;
    text-align: center;
    top: 10px;
    color: white;
`;

const StyledImage = styled.img`
    transition: transform 0.3s ease-in-out;
    transform: scale(1);
`;

export { 
    StyledList,
    StyledCard,
    GradientOverlay,
    CenteredContent,
    StyledImage,
};