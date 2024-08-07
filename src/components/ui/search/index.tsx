import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Style from './search.module.css';

const SearchBar = ({ query, setQuery }: any) => {
  return (
    <div>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search"
        style={{ height: 40, borderRadius: 10 }}
        onPressEnter={(e: any) =>
          setQuery({ ...query, search: e.target.value })
        }
        className={Style.search}
      />
    </div>
  );
};

export default SearchBar;
