/* eslint-disable tailwindcss/no-custom-classname */
import type { SupportedLocale } from 'components/layout/navbar/language-control';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import './styles.css';

import Script from 'next/script';
import Image005 from '/public/subsite/images/concept-img1.jpg';
import Image006 from '/public/subsite/images/concept-img2.jpg';
import Image001 from '/public/subsite/images/fv-bg.png';
import Image011 from '/public/subsite/images/gift-bg.jpg';
import Image004 from '/public/subsite/images/kv-img.jpg';
import Image002 from '/public/subsite/images/logo-black.png';
import Image009 from '/public/subsite/images/narai-img.jpg';
import Image007 from '/public/subsite/images/point-bg1.jpg';
import Image008 from '/public/subsite/images/point-bg2.jpg';
import Image010 from '/public/subsite/images/review-img.png';
import Image003 from '/public/subsite/images/touson.png';

const { SITE_NAME } = process.env;

export const metadata = {
  title: SITE_NAME,
  description: SITE_NAME,
  openGraph: {
    type: 'website'
  }
};

export default async function ExperimentalPage({
  params: { locale }
}: {
  params: { locale?: SupportedLocale };
}) {
  if (locale) {
    unstable_setRequestLocale(locale);
  }
  return (
    <div>
      <section className="section fv-section">
        <Image className="fv-bgimg" src={Image001} alt={''} />
        <header className="headerbox">
          <Image src={Image002} className="header-logo" alt={''} />
        </header>
        <div className="fv-txbox">
          <h1 className="vertical fv-title">大自然、信州からの贈り物</h1>
        </div>
        <div className="fv-scroll" id="scroll">
          <a href="#section2">Scroll</a>
        </div>
      </section>

      <section className="section pdg-base section-nagano">
        <div className="section-titlebox">
          <h2 className="section-h2 tx-center">
            知る人ぞ知る<span className="inlineb">美酒の地「長野」</span>
          </h2>
        </div>
        <div className="section-textbox tx-center nagano-txbox">
          <p className="white p-mgn">「木曾路（きそじ）はすべて山の中」</p>
          <p className="p-mgn">
            近代文学の礎を築いた郷土ゆかりの
            <br className="br-mb" />
            文豪・島崎藤村（しまざきとうそん）
            <br className="br-smb" />
            が遺した
            <br className="br-nosmb" />
            不朽の名作
            <br className="br-smb" />
            『夜明け前』書き出しの一節です。
          </p>
          <p className="p-mgn">
            3,000m級の山峰がもたらす清水は、
            <br className="br-mb" />
            太古の昔からこの地を潤してきました。
          </p>
          <p className="p-mgn">
            清浄な名水は酒造りに欠かせません。
            <br />
            豊かな自然環境の中で
            <br className="br-mb" />
            歴史を紡いだ長野県は、
            <br className="br-mb" />
            今では全国3位の酒蔵数を誇ります。
          </p>
          <p className="p-mgn">
            長野は知る人ぞ知る美酒の地。
            <br className="br-mb" />
            長野の酒は<span className="white">山で醸される</span>のです。
          </p>
          <p className="p-mgn">
            そんな長野県に、
            <br className="br-smb" />
            <span className="white">
              「空に一番近い」と呼ばれる酒が
              <br className="br-mb" />
              あることをご存じでしょうか？
            </span>
          </p>
          <Image src={Image003} className="img-touson" alt={''} />
        </div>
      </section>

      <section className="section section-kv">
        <Image src={Image004} className="section-kv-bg" alt={''} />
        <div className="kv-titlebox">
          <h2 className="kv-h2">山の水、空に一番近い酒</h2>
          <p className="kv-tx font-alpina">water of the mountains, sake of the skies</p>
        </div>
      </section>

      <section className="section pdg-base section-concept">
        <div className="concept-row">
          <div className="tx-center concept-txbox">
            <p className="p-mgn">
              「<span className="font-alpina">narai</span>」は日本で最も標高が高い蔵元で
              <span className="inlineb">醸された日本酒です。</span>
            </p>
            <p className="p-mgn">
              透明感と丸みのある滑らかな舌触りで、
              <br />
              飲み手を選ばず、<span className="inlineb">誰もが自然体で楽しめる味わい。</span>
            </p>
            <p className="p-mgn">
              一方で、長く伸びる余韻が、
              <span className="inlineb">特別な満足感をもたらします。</span>
            </p>
            <p className="p-mgn white">
              「ひと口飲めば、<span className="inlineb">山と水の情景が思いうかぶ」</span>
            </p>
            <p className="p-mgn">
              信州で育まれた大自然の恵みが、
              <br />
              「凛」と体に澄みわたるような一本です。
            </p>
            <p className="mgn0">
              長野が育んだ大自然の魅力を伝える贈り物に、
              <br />
              ぴったりな逸品といえるでしょう。
            </p>
          </div>
          <div className="concept-imgbox">
            <Image src={Image005} className="concept-img" alt={''} />
            <Image src={Image006} className="concept-img" alt={''} />
          </div>
        </div>
      </section>

      <section className="section pdg-base section-point1">
        <Image src={Image007} className="section-point-bg" alt={''} />
        <div className="section-point1-bgfilter" />
        <div className="point-content">
          <div className="section-titlebox">
            <p className="point-number">1</p>
            <h2 className="section-h2 tx-center">
              標高1,000mを超える
              <br />
              天然の山水が育んだ酒
            </h2>
          </div>
          <div className="section-textbox tx-center point-txbox">
            <p className="p-mgn">
              「<span className="font-alpina">narai</span>」の味わいの秘密は、
              <br />
              標高1,000m近い高所で<span className="inlineb">醸造されていること。</span>
            </p>
            <p className="p-mgn">
              ほとんどの日本酒は、
              <br />
              地下から井戸水を汲んで<span className="inlineb">醸されていますが、</span>
              <br />
              <span className="font-alpina">narai</span>は標高1,000m以上から流れる
              <span className="inlineb">天然の超軟水を使用。</span>
            </p>
            <p className="p-mgn">
              汚れない澄み切った環境の中で、
              <br />
              小さな醸造所がひとつひとつの工程を丁寧に、
              <span className="inlineb">お酒をつくり上げています。</span>
            </p>
            <p className="mgn0">
              こうした清浄な自然の恵みを<span className="inlineb">贅沢に活かした酒造りが、</span>
              <br />
              <span className="font-alpina">narai</span>の味わいに表現されているのです。
            </p>
          </div>
        </div>
      </section>

      <section className="section pdg-base section-point2">
        <Image src={Image008} className="section-point-bg" alt={''} />
        <div className="section-point2-bgfilter" />
        <div className="point-content">
          <div className="section-titlebox">
            <p className="point-number">2</p>
            <h2 className="section-h2 tx-center">
              日本最長の宿場町
              <br />
              「奈良井宿」で醸す
            </h2>
          </div>
          <div className="section-textbox tx-center point-txbox">
            <p className="p-mgn">
              木曽路最大の難所と言われる<span className="inlineb">鳥居峠の北に位置する</span>
              <br />
              日本最長の宿場町<span className="inlineb">「奈良井宿（ならいじゅく）」。</span>
            </p>
            <p className="p-mgn">
              <span className="font-alpina">narai</span>を醸造する
              <span className="inlineb">
                「<span className="font-alpina">suginomori brewery</span>」は
              </span>
              <br />
              その歴史的街道の中にあります。
            </p>
            <p className="p-mgn">
              まるで江戸時代に<span className="inlineb">タイムトリップしたような、</span>
              <br />
              時代を超えた美しさを感じる街の景観。
              <br />
              移りゆく四季の中で、
              <span className="inlineb">自然と完全に調和した空間を作っています。</span>
            </p>
            <p className="p-mgn">
              「この豊かな土地の魅力を<span className="inlineb">贅沢に味で表現したい」</span>
            </p>
            <p className="p-mgn">
              「私たちのsakeをきっかけに、
              <span className="inlineb">奈良井宿という魅力的な宿場町を</span>
              <br />
              世界の人に知ってもらい、<span className="inlineb">足を運んで頂きたい」</span>
            </p>
            <p className="mgn0">
              そんな想いで、
              <br />
              200年以上続く老舗酒蔵「杉の森酒造」は、
              <br />
              2021年に「<span className="font-alpina">suginomori brewery</span>」として
              <span className="inlineb">生まれ変わりました。</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section pdg-base section-narai">
        <div className="section-titlebox">
          <h2 className="section-h2 tx-center">
            3つの<span className="font-alpina">narai</span>
          </h2>
        </div>
        <Image src={Image009} className="narai-img" alt={''} />
        <p className="font13 tx-center narai-img-note font-alpina">
          narai、narai sankei、narai kinmon
        </p>
        <div className="section-textbox tx-center narai-txbox">
          <p className="p-mgn">
            「<span className="font-alpina">narai</span>」は、
            <span className="inlineb">わずか3つの銘柄で構成されています。</span>
          </p>
          <p className="p-mgn">
            米の味わいにフォーカスした
            <span className="inlineb">
              「<span className="font-alpina">narai kinmon</span>」は、
            </span>
            <br />
            ボディがあり、グリルしたロブスターや
            <span className="inlineb">味の濃いめなシーフードと合う食中酒。</span>
          </p>
          <p className="p-mgn">
            山水のミネラル感にフォーカスした
            <span className="inlineb">
              「<span className="font-alpina">narai sankei</span>」は、
            </span>
            <br />
            さらりと飲みやすくキレもあり、
            <span className="inlineb">
              食前酒や前菜のサラダ、<span className="inlineb">淡白な白身魚向き。</span>
            </span>
          </p>
          <p className="p-mgn">
            そして、<span className="font-alpina">narai</span>の限定醸造酒である
            <span className="inlineb">
              「<span className="font-alpina">narai</span>」は、
            </span>
            <br />
            最も奥深く複雑な味わいで
            <span className="inlineb">ミステリアスな魅力をもっています。</span>
          </p>
          <p className="p-mgn">
            限られた銘柄に集中した<span className="inlineb">小規模生産だからこそ、</span>
            <br />
            全ての工程が丁寧な手作業かつ
            <span className="inlineb">高品質な酒造りが可能となりました。</span>
          </p>
          <p className="mgn0">
            生産数も限られているため、
            <br />
            どの銘柄も売り切れ次第<span className="inlineb">販売は終了となります。</span>
            <br />
            ご希望の場合はお早めに。
          </p>
        </div>
      </section>

      <section className="section pdg-base section-review">
        <div className="review-container">
          <div className="review-col">
            <div className="section-titlebox review-titlebox">
              <h2 className="section-h2 tx-center">
                名店が語る、
                <span className="inlineb">
                  <span className="font-alpina">narai</span>の魅力
                </span>
              </h2>
            </div>
            <p className="mgn0 tx-center review-p">
              日本が世界に誇る<span className="inlineb">ファインダイニングからも</span>
              <span className="inlineb">
                <span className="font-alpina">narai</span>は高く評価されています。
              </span>
              <br />
              「傳」女将 長谷川えみさんは
              <span className="inlineb">
                <span className="font-alpina">narai</span>シリーズの魅力を
              </span>
              <span className="inlineb">以下のように語ります。</span>
            </p>
            <div className="review-txbox tx-center">
              <div className="review-item">
                <p className="p-mgn font20 font-alpina">narai</p>
                <p className="mgn0">
                  長野のお酒は旨味や甘味が
                  <span className="inlineb">しっかりしているものも多いですが、</span>
                  <br />
                  <span className="font-alpina">narai</span>はフレッシュで
                  <span className="inlineb">複雑さも兼ね備えた味わいで、</span>
                  <br />
                  新しい日本酒の可能性を感じ、
                  <span className="inlineb">感動したことが始まりです。</span>
                </p>
              </div>
              <hr className="review-hr" />
              <div className="review-item">
                <p className="p-mgn font20 font-alpina">narai kinmon</p>
                <p className="mgn0">
                  柔らかな香りから<span className="inlineb">口に含んだときの複雑さと旨味、</span>
                  <br />
                  そしてあとに流れていく<span className="inlineb">スッキリした酸味を感じ、</span>
                  <br />
                  「傳」のスペシャリテのひとつ
                  <span className="inlineb">「畑の様子」というサラダに</span>
                  <span className="inlineb">合わせています。</span>
                  <br />
                  様々な調理法で仕上げた
                  <span className="inlineb">ひとつひとつの野菜の味わいに、</span>
                  <br />
                  このフレッシュさと複雑さが
                  <span className="inlineb">とても楽しくマッチします。</span>
                </p>
              </div>
              <hr className="review-hr" />
              <div className="review-item">
                <p className="p-mgn font20 font-alpina">narai sankei</p>
                <p className="mgn0">
                  心地よいフルーティさと<span className="inlineb">清々しさを感じながらも、</span>
                  <br />
                  一口目のジューシーさから<span className="inlineb">柔らかくなめらかに</span>
                  <span className="inlineb">伸びていく余韻が特徴です。</span>
                  <br />
                  熟成させた魚に海苔酢を合わせる
                  <span className="inlineb">「傳」ならではのお造りに</span>
                  <span className="inlineb">楽しんでいただいております。</span>
                </p>
              </div>
            </div>
          </div>
          <div className="review-citebox">
            <div className="review-imgbox">
              <Image src={Image010} className="review-img" alt={''} />
            </div>
            <div className="review-cite-txbox">
              <p className="font11 review-cite-mbtm">
                <a className="review-link" href="https://www.jimbochoden.com/">
                  「傳」
                </a>{' '}
                女将 長谷川えみさん
              </p>
              <p className="font11 review-cite-mbtm">
                2010年から女将を務めており、アジアや世界のベストレストラン50のArt of Hospitality
                Awardを受賞、また「ミシュランガイド東京2022」でサービスアワードを獲得した、
                日本が誇るおもてなしのプロフェッショナルです。
                <br />
                商品在庫が限られている場合がありますので、ご来店の際は店舗へお問い合わせください。
              </p>
              <p className="font11">※画像提供：傳</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pdg-base section-gift">
        <div className="giftbg-pc">
          <Image src={Image011} className="section-gift-bg" alt={''} />
          <div className="section-gift-bgfilter" />
        </div>
        <div className="giftbg-mb">
          <Image src={Image011} className="section-gift-bg" alt={''} />
          <div className="section-gift-bgfilter" />
          <h2 className="section-h2 tx-center gift-h2-mb">
            特別な瞬間に<span className="inlineb">寄り添う</span>
          </h2>
          <div className="point-content">
            <div className="section-titlebox gift-titlebox-pc">
              <h2 className="section-h2 tx-center gift-h2-pc ">
                特別な瞬間に<span className="inlineb">寄り添う</span>
              </h2>
            </div>
            <div className="section-textbox tx-center point-txbox">
              <p className="p-mgn">
                「<span className="font-alpina">narai</span>」は、世界に通用する
                <br />
                美しいデザインからギフトに人気です。
              </p>
              <p className="p-mgn">
                日本酒でありながら、
                <br />
                世界最大のアルコール飲料展
                <span className="inlineb">
                  「<span className="font-alpina">ProWine</span>」東京での
                </span>
                <span className="inlineb">ボトルデザインで入賞。</span>
                <br />
                アジアのトップアワードアジアにて<span className="inlineb">金賞受賞など</span>
                <span className="inlineb">複数の受賞歴をもちます。</span>
              </p>
              <p className="p-mgn">
                ギフトとしてお使いいただける、
                <br />
                オリジナルの「ギフトバッグと
                <span className="inlineb">ポストカード」もご用意しています。</span>
                <br />
                <span style={{ fontSize: '80%' }}>
                  ※ポストカードは直接メッセージを
                  <span className="inlineb">ご記入いただく必要があります。</span>
                </span>
              </p>
              <p className="p-mgn">
                思い出に残したい特別な日に、
                <br />
                <span className="font-alpina">narai</span>で乾杯するひとときを贈りませんか。
              </p>
              <p className="mgn0">
                気の置けない仲間や家族と一緒に、
                <br />
                いつもより少し贅沢な乾杯の時間を
                <span className="inlineb">
                  <span className="font-alpina">narai</span>とともにお楽しみください。
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cta">
        <a className="font20 cta-button" href="https://www.narai.jp/ja">
          「空に一番近い酒」で乾杯する
        </a>
      </section>

      <section className="section pdg-base section-brewery">
        <div className="section-titlebox">
          <h2 className="section-h2 tx-center">
            醸造のその先へ
            <br />– 世界に開かれた酒蔵 –
          </h2>
        </div>
        <div className="section-textbox tx-center brewery-txbox">
          <p className="white p-mgn">
            私たちには、<span className="inlineb">日本酒文化を未来に継承したい</span>
            <span className="inlineb">という信念があります。</span>
          </p>
          <p className="white p-mgn">
            そのために、これまでの常識を<span className="inlineb">もう一度見つめ直すことや、</span>
            <span className="inlineb">新しい試みにも挑戦しています。</span>
            <br />
            そうした挑戦の1つが、
            <span className="inlineb">「開かれた酒蔵」としての在り方です。</span>
          </p>
          <p className="white p-mgn">
            弊蔵は、<span className="inlineb">同敷地内の古民家や酒蔵の一部を改修し、</span>
            <span className="inlineb">
              宿泊施設「<span className="font-alpina">BYAKU Narai</span>」が
            </span>
            <span className="inlineb">隣接しています。</span>
            <br />
            普段はなかなか<span className="inlineb">見ることの出来ない酒造りを</span>
            <span className="inlineb">
              「<span className="font-alpina">BYAKU Narai</span>」のレストランから
            </span>
            <span className="inlineb">間近で感じられることは、</span>
            <br />
            日本酒に興味を持って頂く<span className="inlineb">きっかけになると信じています。</span>
          </p>
          <p className="white p-mgn">
            醸造のその先へ、<span className="inlineb">わたしたちはこれからも自由な発想で</span>
            <span className="inlineb">
              <span className="font-alpina">sake</span>を探究し、
            </span>
            <span className="inlineb">その魅力を伝えていきます。</span>
          </p>
        </div>
      </section>

      <div className="fixed-button">
        <a className="fixed-button-link" href="/">
          「空に一番近い酒」で乾杯する
        </a>
      </div>

      <section className="section pdg-base section-brewery">
        <div className="section-titlebox">
          <h2 className="section-h2 tx-center">
            醸造のその先へ
            <br />– 世界に開かれた酒蔵 –
          </h2>
        </div>
        <div className="section-textbox tx-center brewery-txbox">
          <p className="white p-mgn">
            私たちには、<span className="inlineb">日本酒文化を未来に継承したい</span>
            <span className="inlineb">という信念があります。</span>
          </p>
          <p className="white p-mgn">
            そのために、これまでの常識を<span className="inlineb">もう一度見つめ直すことや、</span>
            <span className="inlineb">新しい試みにも挑戦しています。</span>
            <br />
            そうした挑戦の1つが、
            <span className="inlineb">「開かれた酒蔵」としての在り方です。</span>
          </p>
          <p className="white p-mgn">
            弊蔵は、<span className="inlineb">同敷地内の古民家や酒蔵の一部を改修し、</span>
            <span className="inlineb">
              宿泊施設「<span className="font-alpina">BYAKU Narai</span>」が
            </span>
            <span className="inlineb">隣接しています。</span>
            <br />
            普段はなかなか<span className="inlineb">見ることの出来ない酒造りを</span>
            <span className="inlineb">
              「<span className="font-alpina">BYAKU Narai</span>」のレストランから
            </span>
            <span className="inlineb">間近で感じられることは、</span>
            <br />
            日本酒に興味を持って頂く<span className="inlineb">きっかけになると信じています。</span>
          </p>
          <p className="white p-mgn">
            醸造のその先へ、<span className="inlineb">わたしたちはこれからも自由な発想で</span>
            <span className="inlineb">
              <span className="font-alpina">sake</span>を探究し、
            </span>
            <span className="inlineb">その魅力を伝えていきます。</span>
          </p>
        </div>
        <div className="brewery-video relative">
          <iframe
            src="https://player.vimeo.com/video/617871561?autoplay=1&loop=1&autopause=0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
            title="suginomori brewery brand video"
          />
        </div>
        <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" />
      </section>

      <footer className="section footer">
        <a className="font13 footer-link" href="https://www.narai.jp">
          運営会社
        </a>
        <a className="font13 footer-link" href="https://www.narai.jp/ja/privacy">
          プライバシーポリシー
        </a>
        <a className="font13 footer-link" href="https://www.narai.jp/en/disclosures">
          特定商取引に関する法律に基づく表示
        </a>
      </footer>
    </div>
  );
}
