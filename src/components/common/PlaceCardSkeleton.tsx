import { css } from "@emotion/react";
import React, { forwardRef } from "react";
import palette from "../../libs/style/palette";

interface PlaceCardSkeletonProps {}
const PlaceCardSkeleton = (
  props: PlaceCardSkeletonProps,
  ref: React.Ref<HTMLDivElement>
) => {
  return (
    <div ref={ref} css={card}>
      <h2 className="relative flex-auto">
        <div css={[skeleton, titleSkeleton]} />
      </h2>
      <dl className="flex flex-wrap">
        <div css={[skeleton, itemSkeleton]} />
        <div css={[skeleton, itemSkeleton]} />
        <div css={[skeleton, itemSkeleton]} />
        <div className="flex-none w-full">
          <div css={[skeleton, itemSkeleton]} />
        </div>
      </dl>
    </div>
  );
};

export default forwardRef<HTMLDivElement, PlaceCardSkeletonProps>(
  PlaceCardSkeleton
);

const card = css`
  width: 100%;
  height: 105px;
  min-height: 105px;
`;

const skeleton = css`
  background: ${palette.blueGray50};
  border-radius: 0.25rem;
  animation: shining 1s ease-in-out infinite;
`;

const titleSkeleton = css`
  height: 1.5rem;
  width: 20rem;
  margin-top: 0.5rem;
  margin-left: 0.35rem;
  margin-bottom: 0.5rem;
`;

const itemSkeleton = css`
  width: 5rem;
  height: 1rem;
  margin-top: 0.2rem;
  margin-left: 0.35rem;
  margin-bottom: 0.2rem;
  & + & {
    margin-left: 1rem;
  }
`;
