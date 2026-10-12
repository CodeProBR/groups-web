import * as linkstelegram from "@/sites/linkstelegram.com/styles/footer.module.scss";
import * as toptelegram from "@/sites/toptelegram.com.br/styles/footer.module.scss";

const styles = {
    "linkstelegram.com": linkstelegram,
    "toptelegram.com.br": toptelegram,
};

export default styles[process.env.NEXT_PUBLIC_SITE] || {};