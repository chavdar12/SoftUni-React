import './avatar.scss';

interface AvatarProps {
  classes?: string;
  image?: string;
}

export function Avatar({ classes, image }: AvatarProps) {
  return (
    <div className={['avatar', classes].join(' ')}>
      <img src={image} alt="avatar" />
    </div>
  );
}

export default Avatar;
