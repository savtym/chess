

var dbm;
var type;
var seed;

const defaultValues = [
	[1, 2, 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1', 15, false],
	[1, 1, 'rnbqkbnr/pp1ppppp/8/2p5/3P4/8/PPP1PPPP/RNBQKBNR w KQkq c6 0 2', 3, false],
	[1, 2, 'rnbqkbnr/pp1ppppp/8/2P5/8/8/PPP1PPPP/RNBQKBNR b KQkq - 0 2', 3, false],
	[1, 1, 'rnbqkbnr/pp2pppp/8/2Pp4/8/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 3', 4, false],
	[1, 2, 'rnbqkbnr/pp2pppp/8/2Pp4/4P3/8/PPP2PPP/RNBQKBNR b KQkq e3 0 3', 3, false],
	[1, 1, 'rnbqkbnr/pp2pppp/8/2P5/4p3/8/PPP2PPP/RNBQKBNR w KQkq - 0 4', 7, false],
	[1, 2, 'rnbqkbnr/pp2pppp/2P5/8/4p3/8/PPP2PPP/RNBQKBNR b KQkq - 0 4', 8, false],
	[1, 1, 'r1bqkbnr/pp2pppp/2n5/8/4p3/8/PPP2PPP/RNBQKBNR w KQkq - 0 5', 5, false],
	[1, 2, 'r1bqkbnr/pp2pppp/2n5/8/4p3/5P2/PPP3PP/RNBQKBNR b KQkq - 0 5', 3, false],
	[1, 1, 'r1bqkbnr/pp2pppp/2n5/8/8/5p2/PPP3PP/RNBQKBNR w KQkq - 0 6', 5, false],
	[1, 2, 'r1bqkbnr/pp2pppp/2n5/8/8/5Q2/PPP3PP/RNB1KBNR b KQkq - 0 6', 9, false],
	[1, 1, 'r1b1kbnr/pp2pppp/2n5/q7/8/5Q2/PPP3PP/RNB1KBNR w KQkq - 1 7', 7, false],
	[1, 2, 'r1b1kbnr/pp2pppp/2n5/q7/8/2P2Q2/PP4PP/RNB1KBNR b KQkq - 0 7', 6, false],
	[1, 1, 'r1b1kbnr/pp3ppp/2n1p3/q7/8/2P2Q2/PP4PP/RNB1KBNR w KQkq - 0 8', 17, false],
	[1, 2, 'r1b1kbnr/pp3ppp/2n1p3/q5B1/8/2P2Q2/PP4PP/RN2KBNR b KQkq - 1 8', 23, false],
	[1, 1, 'r1b1kbnr/p4ppp/1pn1p3/q5B1/8/2P2Q2/PP4PP/RN2KBNR w KQkq - 0 9', 16, false],
	[1, 2, 'r1b1kbnr/p4ppp/1pn1p3/q5B1/8/N1P2Q2/PP4PP/R3KBNR b KQkq - 1 9', 13, false],
	[1, 1, 'r1b1kbnr/p4p1p/1pn1p1p1/q5B1/8/N1P2Q2/PP4PP/R3KBNR w KQkq - 0 10', 6, false],
	[1, 2, 'r1b1kbnr/p4p1p/1pn1p1p1/q5B1/8/N1P2Q2/PP4PP/2KR1BNR b kq - 1 10', 11, false],
	[1, 1, 'r1b1kbnr/5p1p/ppn1p1p1/q5B1/8/N1P2Q2/PP4PP/2KR1BNR w kq - 0 11', 9, false],
	[1, 2, 'r1b1kbnr/5p1p/ppQ1p1p1/q5B1/8/N1P5/PP4PP/2KR1BNR b kq - 0 11', 3, false],
	[1, 1, 'r3kbnr/3b1p1p/ppQ1p1p1/q5B1/8/N1P5/PP4PP/2KR1BNR w kq - 1 12', 4, false],
	[1, 2, 'r3kbnr/3Q1p1p/pp2p1p1/q5B1/8/N1P5/PP4PP/2KR1BNR b kq - 0 12', 4, true],

	[2, 1, 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1', 3, false],
	[2, 2, 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2', 4, false],
	[2, 1, 'rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2', 6, false],
	[2, 2, 'rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3', 4, false],
	[2, 1, 'rnb1kbnr/ppp1pppp/8/3q4/8/6P1/PPPP1P1P/RNBQKBNR b KQkq - 0 3', 27, false],
	[2, 2, 'rn2kbnr/ppp1pppp/8/3q4/6b1/6P1/PPPP1P1P/RNBQKBNR w KQkq - 1 4', 10, false],
	[2, 1, 'rn2kbnr/ppp1pppp/8/3q4/6b1/6P1/PPPP1PBP/RNBQK1NR b KQkq - 2 4', 11, false],
	[2, 2, 'rn2kbnr/ppp1pppp/8/4q3/6b1/6P1/PPPP1PBP/RNBQK1NR w KQkq - 3 5', 30, false],
	[2, 1, 'rn2kbnr/ppp1pppp/8/4q3/6b1/6P1/PPPPQPBP/RNB1K1NR b KQkq - 4 5', 13, false],
	[2, 2, 'rn2kbnr/ppp1pppp/8/8/6b1/6P1/PPPPqPBP/RNB1K1NR w KQkq - 0 6', 4, false],
	[2, 1, 'rn2kbnr/ppp1pppp/8/8/6b1/6P1/PPPPNPBP/RNB1K2R b KQkq - 0 6', 9, false],
];

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return db.createTable('history', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    game_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'history_game_id_fk',
        table: 'games',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    player_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'history_player_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    state: {type: 'string', notNull: true},
    time: {type: 'int', notNull: true},
    give_up: {type: 'boolean', defaultValue: false},
  }, () => {
    for (let w of defaultValues) {
      db.insert('history', ['game_id', 'player_id', 'state', 'time', 'give_up'], w, callback);
    }
  });
};

exports.down = function(db) {
  return db.dropTable('history');
};

exports._meta = {
  "version": 1
};
