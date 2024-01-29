import React from 'react';
type Props = {
  itemCount: number;
};

const PlaylistItemSkeleton = ({ itemCount }: Props) => {
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => (
    <div
      key={index}
      className="h-16 w-full animate-pulse bg-neutral-900/50"
    ></div>
  ));
  return <div className="flex flex-col gap-2">{skeletonItems}</div>;
};

export default PlaylistItemSkeleton;
