import { Block } from "#components";
import { useGetAllUsers } from "#hooks";
import { useCallback, useState } from "react";
import { Cell, Column, HeaderCell, SortType, Table } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";

function AdminUsersBlock() {
  const { userProfiles, fetchUserProfiles, loading } = useGetAllUsers();
  console.log(userProfiles);

  const [sortBy, setSortBy] = useState<string>();
  const [sortColumn, setSortColumn] = useState<SortType>("asc");
  const tableHeight = 500;

  const handleSortColumn = useCallback(
    (sortColumn: string, sortType?: SortType) => {
      if (sortType) {
        setSortBy(sortColumn);
        setSortColumn(sortType);
      }
    },
    []
  );

  const getSortValue = useCallback((item: any, field: any) => {
    return item[field];
  }, []);

  const getData = useCallback(() => {
    if (sortColumn && userProfiles) {
      return userProfiles.sort((a, b) => {
        const x = getSortValue(a, sortBy);
        const y = getSortValue(b, sortBy);

        if (typeof x === "string" && typeof y === "string") {
          return sortColumn === "asc" ? x.localeCompare(y) : y.localeCompare(x);
        }

        if (typeof x === "number" && typeof y === "number") {
          return sortColumn === "asc" ? x - y : y - x;
        }

        return 0;
      });
    }
  }, [sortColumn, sortBy, userProfiles, getSortValue]);

  let fetching = false;

  const handleScroll = (_x: any, y: any) => {
    const contextHeight = userProfiles!.length * 46;
    const top = Math.abs(y);

    if (contextHeight - top - tableHeight < 400 && !fetching) {
      fetching = true;
      fetchUserProfiles();
    }
  };

  const tableHeaders = [
    {
      name: "Name",
      dataIndex: "lastName",
    },
    {
      name: "Email",
      dataIndex: "email",
    },
    {
      name: "Phone",
      dataIndex: "phone",
    },
  ];
  return (
    <Block classes="admin-users-block">
      <Table
        height={tableHeight}
        data={getData()}
        onScroll={handleScroll}
        sortColumn={sortBy}
        sortType={sortColumn}
        onSortColumn={handleSortColumn}
        loading={loading}
      >
        {tableHeaders.map((header) => {
          if (header.name === "Name") {
            return (
              <Column
                key={header.name}
                flexGrow={1}
                resizable
                sortable
                minWidth={100}
                align="center"
              >
                <HeaderCell>{header.name}</HeaderCell>
                <Cell dataKey={header.dataIndex} />
              </Column>
            );
          }

          return (
            <Column
              key={header.name}
              flexGrow={1}
              resizable
              sortable
              minWidth={100}
              align="center"
            >
              <HeaderCell>{header.name}</HeaderCell>
              <Cell dataKey={header.dataIndex} />
            </Column>
          );
        })}
      </Table>
    </Block>
  );
}

export default AdminUsersBlock;
