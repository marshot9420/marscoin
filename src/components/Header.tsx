import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../routes/atoms";

interface HeaderProps {
  name: string;
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

const DarkModeButton = styled.div<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? "#149E1D" : "gray")};
  width: 50px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => props.theme.textColor};
  transition: transform 0.3s;
`;

const DarkModeIcon = styled.div<{ isDark: boolean }>`
  display: flex;
  background-color: ${(props) => (props.isDark ? "black" : "whitesmoke")};
  border-radius: 50%;
  height: 25px;
  width: 25px;
  align-items: center;
  transition: transform 0.3s;
  transform: translateX(${(props) => (props.isDark ? "130%" : "0%")});
  color: ${(props) => (props.isDark ? "gray" : "orange")};
  z-index: 2;
`;

const Header = ({ name }: HeaderProps) => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const toggleDark = () => {
    setIsDark((prevMode) => !prevMode);
  };

  return (
    <Title>
      <HomeButton to="/">
        <AiFillHome />
      </HomeButton>
      <TitleContent>{name}</TitleContent>
      <DarkModeButton isDark={isDark} onClick={toggleDark}>
        <DarkModeIcon isDark={isDark}>
          {isDark ? <MdDarkMode /> : <MdSunny />}
        </DarkModeIcon>
      </DarkModeButton>
    </Title>
  );
};

export default Header;
