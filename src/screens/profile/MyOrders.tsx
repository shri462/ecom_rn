import {StyleSheet, View} from 'react-native';
import React from 'react';
import {DataTable, Text} from 'react-native-paper';
import _ from '../../styles/utilityStyles';
import {useAppSelector} from '../../data/hooks/hooks';
import {getDateFormat} from '../../utilities/date.utility';

const MyOrders = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const {orders} = useAppSelector(state => state.order);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, orders.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <Text style={[_.mt_16]} variant="titleLarge">
        Your Orders
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Order Id</DataTable.Title>
          <DataTable.Title>Order Date</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>

        {orders.slice(from, to).map(item => (
          <DataTable.Row key={item.$id}>
            <DataTable.Cell>{item.$id}</DataTable.Cell>
            <DataTable.Cell>
              {getDateFormat(item.$createdAt, 'MMM DD, LT')}
            </DataTable.Cell>
            <DataTable.Cell numeric>₹ {item.amount}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(orders.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${orders.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
