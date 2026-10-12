import * as linkstelegram from "@/sites/linkstelegram.com/styles/aside.module.scss";
import * as toptelegram from "@/sites/toptelegram.com.br/styles/aside.module.scss";

const styles = {
    "linkstelegram.com": linkstelegram,
    "toptelegram.com.br": toptelegram,
};

export default styles[process.env.NEXT_PUBLIC_SITE] || {};