import { useAdventurersByXPWithScores } from "@/hooks";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useConnect } from "@starknet-react/core";
import { useState } from "react";
import { AnimatedNumber } from "../ui/animatedNumber";

export const LandingPage = () => {
  const { connect, connectors } = useConnect();

  const [page, setPage] = useState(1);

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const { adventurersWithScores, isLoading, isError } =
    useAdventurersByXPWithScores({ page });

  const itemsPerPage = 10;
  const totalPages = 5;
  const startingRank = (page - 1) * itemsPerPage + 1;

  return (
    <div className="w-screen h-screen bg-skulls bg-cover bg-no-repeat bg-center flex justify-center">
      <div className="self-center sm:w-1/2 text-center uppercase">
        <div className="sm:text-5xl mb-8">Leaderboard</div>
        <div className="bg-black/90 p-10 w-full border border-primary rounded-2xl ">
          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-xl pb-3 px-4 border-b  border-primary">
                    Rank
                  </th>
                  <th className="text-xl pb-3 px-4 border-b  border-primary">
                    Player
                  </th>
                  <th className="text-xl pb-3 px-4 border-b  border-primary">
                    Score
                  </th>
                  <th className="text-xl pb-3 px-4 border-b  border-primary">
                    Lords Payout
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && <div className="p-10 mx-auto">Loading...</div>}
                {isError && <div>Error</div>}
                {adventurersWithScores?.slice(0, 1).map((adventurer, index) => (
                  <tr key={index} className=" bg-primary text-black">
                    <td className="text-xl py-5 px-4 border-b border-primary">
                      {startingRank}
                    </td>
                    <td className="text-xl py-5 px-4 border-b border-primary">
                      {adventurer.name}
                    </td>
                    <td className="text-xl py-5 px-4 border-b border-primary">
                      {adventurer.xp}
                    </td>
                    <td className="text-xl py-5 px-4 border-b border-primary">
                      <AnimatedNumber value={adventurer.totalPayout || 0} />
                    </td>
                  </tr>
                ))}
                {adventurersWithScores
                  ?.slice(1, 12)
                  .map((adventurer, index) => (
                    <tr key={index} className=" ">
                      <td className="py-3 px-4 border-b border-primary">
                        {startingRank + index + 1}
                      </td>
                      <td className="py-3 px-4 border-b border-primary">
                        {adventurer.name}
                      </td>
                      <td className="py-3 px-4 border-b border-primary">
                        {adventurer.xp}
                      </td>
                      <td className="py-3 px-4 border-b border-primary">
                        <AnimatedNumber value={adventurer.totalPayout || 0} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePreviousPage} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() => setPage(i + 1)}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>{" "}
    </div>
  );
};
