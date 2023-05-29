import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { CiDark, CiSun } from "react-icons/ci";
import { useState } from "react";

interface HeaderProps {
  name: string;
  toggleDark: () => void;
}

const Title = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  max-width: 480px;
`;

const TitleContent = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const HomeButton = styled(Link)`
  display: flex;
  color: ${(props) => props.theme.textColor};
  font-size: 40px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const DarkModeButton = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? "black" : "#149E1D")};
  width: 50px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => props.theme.textColor};
  transition: transform 0.3s;
`;

const DarkModeIcon = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  background-color: ${(props) => (props.isDarkMode ? "white" : "black")};
  border-radius: 50%;
  height: 25px;
  width: 25px;
  align-items: center;
  transition: transform 0.3s;
  transform: translateX(${(props) => (props.isDarkMode ? "130%" : "0%")});
  color: ${(props) => (props.isDarkMode ? "black" : "white")};
  z-index: 2;
`;

const Header = ({ name, toggleDark }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    toggleDark();
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Title>
      <HomeButton to="/">
        <AiFillHome />
      </HomeButton>
      <TitleContent>{name}</TitleContent>
      <DarkModeButton isDarkMode={isDarkMode} onClick={handleDarkModeToggle}>
        <DarkModeIcon isDarkMode={isDarkMode}>
          {isDarkMode ? <CiSun /> : <CiDark />}
        </DarkModeIcon>
      </DarkModeButton>
    </Title>
  );
};

export default Header;
