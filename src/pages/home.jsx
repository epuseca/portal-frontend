import { CrownOutlined } from "@ant-design/icons"
import { Result } from "antd"

const HomePage = () => {
    return(
        <div style={{padding: 20}}>
            <Result
                icon={<CrownOutlined/>}
                title="JSON WEB TOKEN (React/Node.JS) - create Loc"
            />
        </div>
    )
}
export default HomePage