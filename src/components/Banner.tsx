interface BannerProps {
    title: String;
}

const Banner = ({title}: BannerProps) => (
    <h1 className="items-center justify-center text-center">
        {title}
    </h1>
);

export default Banner;