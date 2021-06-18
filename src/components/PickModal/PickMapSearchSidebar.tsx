import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import PlaceCard from "../common/PlaceCard";

import {
  createKey,
  useKakaoKeywordSearchQuery,
} from "../../api/kakao/kakao.hook";
import { undrawEmpty } from "../../assets/images";
import PlaceCardSkeleton from "../common/PlaceCardSkeleton";
import {
  Document,
  KakaoKeywordSearhModel,
} from "../../api/kakao/kakao.typedef";
import useMarkerObject from "../../hooks/useMarkerObject";

interface PickMapSearchSidebarProps {}
const PickMapSearchSidebar: React.FC<PickMapSearchSidebarProps> = () => {
  const queryClient = useQueryClient();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  const { data, fetchNextPage, hasNextPage } = useKakaoKeywordSearchQuery(
    keyword
  );

  const { getFactory } = useMarkerObject();

  const onClickPlaceLocation = useCallback((document: Document) => {
    console.log(document);
    const markerFactory = getFactory();
    console.log("markerFactory", markerFactory);
    markerFactory?.makeAddMarker(null, Number(document.x), Number(document.y));
  }, []);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const element = e.currentTarget;

    const eleInput = element.querySelector<HTMLInputElement>(
      'input[type="search"]'
    );

    if (eleInput?.value) setKeyword(eleInput.value);
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value && keyword) {
        queryClient.setQueryData(createKey(keyword), null);
        setKeyword("");
      }
    },
    [keyword]
  );

  const items = useMemo(() => {
    if (!data) return null;
    return data.pages.flat();
  }, [data]);

  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      }),
    [fetchNextPage]
  );

  useEffect(() => {
    if (!items) return;
    if (!loadMoreRef.current) return;
    const el = loadMoreRef.current;
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [observer, items]);

  return (
    <div className="block">
      <form className="py-5" onSubmit={onSubmit}>
        <input
          type="search"
          placeholder="검색"
          autoComplete="off"
          name="query"
          css={searchInputStyles}
          onChange={onChange}
        />
      </form>
      <SearchResultBlock
        className="flex flex-col divide-y divide-gray-100"
        result={items}
      >
        {items ? (
          <React.Fragment>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.documents.map((document, i) => (
                  <PlaceCard
                    key={document.id}
                    document={document}
                    onClickPlaceLocation={onClickPlaceLocation}
                  />
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : (
          <div css={emptyStyles}>
            <img src={undrawEmpty} alt="empty data" />
            <div css={messageStyles}>검색 결과가 없습니다.</div>
          </div>
        )}

        {hasNextPage &&
          Array.from({ length: 10 }).map((_, i) => (
            <PlaceCardSkeleton
              key={i}
              ref={i === 0 ? loadMoreRef : undefined}
            />
          ))}
      </SearchResultBlock>
    </div>
  );
};

export default PickMapSearchSidebar;

const SearchResultBlock = styled.div<{
  result: KakaoKeywordSearhModel[] | null;
}>`
  ${(props) =>
    props.result &&
    css`
      overflow-y: auto;
      height: 768px;
    `}
`;

const searchInputStyles = css`
  height: 50px;
  line-height: 50px;
  width: 100%;
  margin: 0;
  padding: 0 36px 0 36px;
  border: 1px solid #f2f4f7;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #767676;
  background-color: #f2f4f7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: none;
`;

const messageStyles = css`
  text-align: center;
  font-size: 2rem;
  color: rgb(134, 142, 150);
  margin-bottom: 2rem;
`;

const emptyStyles = css`
  transform: translateY(25%);
  height: 100%;
`;
