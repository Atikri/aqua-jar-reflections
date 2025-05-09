
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Mail, Instagram } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* About Header */}
      <section className="bg-aqua-light py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              关于 AQUA IN JAR
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              了解更多关于这个网站和创建者的故事
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
              关于这个网站
            </h2>
            <p className="mb-6">
              AQUA IN JAR（瓶中水）是一个个人博客和创作分享平台。这里收集了我的文字、音乐、视频等创作内容。就像瓶中的水一样，这些内容被小心地收集和保存，希望能够与你分享我的思考、感受和创作。
            </p>
            <p className="mb-6">
              在这个数字时代，我们被大量的信息所包围，有时候需要一个安静的角落来沉淀自己的思考。这个网站就是我的一个小小角落，希望在这里能够提供一些有价值的内容，也许是一篇文章、一首歌曲或者一段视频，让你在忙碌的生活中短暂停留，获得一些思考或者放松的时间。
            </p>

            <h2 className="text-2xl md:text-3xl font-serif font-semibold mt-12 mb-6">
              关于我
            </h2>
            <p className="mb-6">
              我是tikri，一个热爱创作的普通人。喜欢写作、音乐和摄影，希望通过这些媒介来表达自己的想法和感受。
            </p>
            <p className="mb-6">
              我相信，创作是一种对生活的解读和表达。通过创作，我们可以更深入地思考自己的经历和感受，也可以与他人分享这些思考和感受。
            </p>
            <p className="mb-6">
              很高兴你能来到这个网站。希望你能在这里找到一些有价值的内容，也许是一篇文章、一首歌曲或者一段视频，让你在忙碌的生活中短暂停留，获得一些思考或者放松的时间。
            </p>

            <h2 className="text-2xl md:text-3xl font-serif font-semibold mt-12 mb-6">
              联系我
            </h2>
            <p className="mb-6">
              如果你有任何问题、建议或者合作意向，欢迎通过以下方式联系我：
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="bg-aqua-dark hover:bg-aqua flex gap-2 items-center">
                <Mail className="h-4 w-4" />
                <a href="mailto:aqutikri@gmail.com">aqutikri@gmail.com</a>
              </Button>
              <Button variant="outline" className="border-aqua-dark text-aqua-dark hover:bg-aqua-light flex gap-2 items-center">
                <Instagram className="h-4 w-4" />
                <a href="https://www.atikri-ig.com" target="_blank" rel="noopener noreferrer">www.atikri-ig.com</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
