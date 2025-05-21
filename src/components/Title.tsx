import { Link } from 'react-router-dom';

interface Props {
  title: string;
}

function Title({ title }: Props) {
  return (
    <h1 className="flex items-center gap-2 text-2xl font-semibold text-foreground" >
      <Link to="/">
      {title}
        {/* <Home size={24} /> */}
      </Link>
      {/* <a href="https://github.com/sadanandpai/algo-visualizers" target="blank">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="github repo"
          className="w-[25px] h-[25px] ml-1 dark:invert"
        />
      </a> */}
    </h1>
  );
}

export default Title;
