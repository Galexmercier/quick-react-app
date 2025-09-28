interface BannerProps {
    title: String;
}

const Banner = ({title}: BannerProps) => (
    <h1 className="text-center">
        {title}
    </h1>
);

export default Banner;