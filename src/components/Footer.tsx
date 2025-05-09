
import { Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold text-gray-900">AQUA IN JAR</h3>
            <p className="mt-2 text-gray-600">
              Hi，欢迎来到tikri的瓶子中，很高兴可以在瓶中相遇，在这边逗留一会儿吧！
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">导航</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-aqua-dark">主页</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-600 hover:text-aqua-dark">博客</Link>
              </li>
              <li>
                <Link to="/music" className="text-gray-600 hover:text-aqua-dark">音乐</Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-600 hover:text-aqua-dark">视频</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-aqua-dark">关于</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">联系方式</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-aqua-dark" />
                <a href="mailto:aqutikri@gmail.com" className="text-gray-600 hover:text-aqua-dark">
                  aqutikri@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Instagram className="h-5 w-5 mr-2 text-aqua-dark" />
                <a href="https://www.atikri-ig.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-aqua-dark">
                  www.atikri-ig.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} AQUA IN JAR. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              Designed with 💙 by tikri
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
